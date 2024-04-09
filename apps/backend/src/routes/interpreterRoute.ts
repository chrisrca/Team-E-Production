import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { InterpreterServiceRequest } from "common/src/types";

const router = express.Router();

let interp: string;

async function getInterpsFromDB(): Promise<string> {
    interp = await client.$queryRaw`SELECT * FROM interpreter`;
    return interp;
}

router.post("/", async (req: Request, res: Response) => {
    const interpRequest: InterpreterServiceRequest = req.body;
    try {
        await client.interpreter.create({
            data: {
                clientName: interpRequest.clientName,
                language: interpRequest.language,
                duration: interpRequest.duration,
                location: interpRequest.location,
                additionalInfo: interpRequest.additionalInfo,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add interps to database");
    }
    res.send("Interps added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getInterpsFromDB();
    res.send(msg);
});

export default router;
