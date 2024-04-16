import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { MedicalDeviceServiceRequest } from "common/src/types";

const router = express.Router();

let medicalDevice: string;

async function getMedicalDeviceFromDB(): Promise<string> {
    medicalDevice = await client.$queryRaw`SELECT * FROM medicaldevice`;
    return medicalDevice;
}

router.post("/", async (req: Request, res: Response) => {
    const MedicalService: MedicalDeviceServiceRequest = req.body;
    const boolCheck: boolean = /^true$/i.test(MedicalService.withBalloons);
    try {
        await client.medicaldevice.create({
            data: {
                employeeName: MedicalService.employeeName,
                priority: MedicalService.priority,
                location: MedicalService.location,
                selectedDevice: MedicalService.selectedDevice,
                status: MedicalService.status,
                withBalloons: boolCheck,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add medicalDeviceService to database");
    }
    res.send("MedicalDeviceService added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getMedicalDeviceFromDB();
    res.send(msg);
});

export default router;
