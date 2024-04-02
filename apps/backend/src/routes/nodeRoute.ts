import client from "../bin/database-connection";
import express, { Request, Response } from "express";

const router = express.Router();

async function getNodesFromDB(): Promise<string> {
    const nodes: string = await client.$queryRaw`SELECT * FROM node`;
    return nodes;
}

router.post("/upload", async (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Received");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

export default router;
