import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { GiftServiceRequest } from "common/src/types";

const router = express.Router();

let gift: string;

async function getGiftsFromDB(): Promise<string> {
    gift = await client.$queryRaw`SELECT * FROM gift`;
    return gift;
}

router.post("/", async (req: Request, res: Response) => {
    const giftRequest: GiftServiceRequest = req.body;
    try {
        await client.gifts.create({
            data: {
                recipientName: giftRequest.recipientName,
                deliveryLocation: giftRequest.deliveryLocation,
                message: giftRequest.message,
                giftSize: giftRequest.giftSize,
                priority: giftRequest.priority,
                wrapping: giftRequest.wrapping,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add gift to database");
    }
    res.send("Gifts added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getGiftsFromDB();
    res.send(msg);
});

export default router;
