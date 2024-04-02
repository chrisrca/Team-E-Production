import client from "../bin/database-connection";
import express, { Request, Response } from "express";

const router = express.Router();

let nodes: string;

async function getNodesFromDB(): Promise<string> {
    nodes = await client.$queryRaw`SELECT * FROM node`;
    return nodes;
}

router.get("/", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

export default router;
