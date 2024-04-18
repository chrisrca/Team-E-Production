import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { DBNode } from "common/src/types";

const router = express.Router();

let node: string;

async function getNodesFromDB(): Promise<string> {
    node = await client.$queryRaw`SELECT * FROM node`;
    return node;
}

router.post("/", async (req: Request, res: Response) => {
    const nodeReq: DBNode = req.body;
    try {
        await client.node.delete({
            where: {
                nodeID: nodeReq.nodeID,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to delete node to database");
    }
    res.send("Node deleted from to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

export default router;
