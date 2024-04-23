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
    const nodeData: DBNode = req.body;
    try {
        await client.node.create({
            data: {
                nodeID: nodeData.nodeID,
                xcoord: nodeData.xcoord,
                ycoord: nodeData.ycoord,
                floor: nodeData.floor,
                building: nodeData.building,
                nodeType: nodeData.nodeType,
                longName: nodeData.longName,
                shortName: nodeData.shortName,
                edges: "[]",
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to create node in database");
    }
    res.send("Node created in to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

export default router;
