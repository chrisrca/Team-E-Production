import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SanitationServiceRequest } from "common/src/types";

const router = express.Router();

let sanit: string;

async function getSanitationFromDB(): Promise<string> {
    sanit = await client.$queryRaw`SELECT * FROM sanitation`;
    return sanit;
}

router.post("/", async (req: Request, res: Response) => {
    const sanitRequest: SanitationServiceRequest = req.body;
    try {
        await client.sanitation.create({
            data: {
                patientName: sanitRequest.patientName,
                location: sanitRequest.location,
                serviceType: sanitRequest.serviceType,
                status: sanitRequest.status,
                priority: sanitRequest.priority,
                additionalInfo: sanitRequest.additionalInfo,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add sanit to database");
    }
    res.send("Sanit added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getSanitationFromDB();
    res.send(msg);
});

export default router;
