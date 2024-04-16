import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { FlowerServiceRequest } from "common/src/types";

const router = express.Router();

let flower: string;

async function getFlowersFromDB(): Promise<string> {
    flower = await client.$queryRaw`SELECT * FROM flower`;
    return flower;
}

router.post("/", async (req: Request, res: Response) => {
    const flowerRequest: FlowerServiceRequest = req.body;
    try {
        await client.flower.create({
            data: {
                patientName: flowerRequest.patientName,
                location: flowerRequest.location,
                senderName: flowerRequest.senderName,
                cardMessage: flowerRequest.cardMessage,
                flowerType: flowerRequest.flowerType,
                status: flowerRequest.status,
                priority: flowerRequest.priority,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add flower to database");
    }
    res.send("Flower added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getFlowersFromDB();
    res.send(msg);
});

export default router;
