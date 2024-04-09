import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { RoomSchedulingForm } from "common/src/types";

const router = express.Router();

let room: string;

async function getRoomsFromDB(): Promise<string> {
    room = await client.$queryRaw`SELECT * FROM roomschedule`;
    return room;
}

router.post("/", async (req: Request, res: Response) => {
    const RoomService: RoomSchedulingForm = req.body;
    try {
        await client.roomschedule.create({
            data: {
                employeeName: RoomService.employeeName,
                priority: RoomService.priority,
                location: RoomService.location,
                serviceType: RoomService.serviceType,
                status: RoomService.status,
                startTime: RoomService.startTime,
                endTime: RoomService.endTime,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add roomService to database");
    }
    res.send("RoomService added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getRoomsFromDB();
    res.send(msg);
});

export default router;
