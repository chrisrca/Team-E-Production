import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { DrugDeliveryData } from "common/src/types";

const router = express.Router();

let medicine: string;

async function getMedsFromDB(): Promise<string> {
    medicine = await client.$queryRaw`SELECT * FROM medicine`;
    return medicine;
}

router.post("/", async (req: Request, res: Response) => {
    const medicineRequest: DrugDeliveryData = req.body;
    try {
        await client.medicine.create({
            data: {
                patientName: medicineRequest.patientName,
                location: medicineRequest.location,
                patientCondition: medicineRequest.patientCondition,
                drugName: medicineRequest.drugName,
                drugQuantity: medicineRequest.drugQuantity,
                status: medicineRequest.status,
                priority: medicineRequest.priority,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add meds to database");
    }
    res.send("Meds added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getMedsFromDB();
    res.send(msg);
});

export default router;
