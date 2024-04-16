import express, { Router } from "express";
import runBFS from "../algos/BFS";
import runASTAR from "../algos/ASTAR";
import runDFS from "../algos/DFS.ts";

const router: Router = express.Router();
let path;
router.get("/:start/:end/:algo", async (req, res) => {
    const { start, end, algo } = req.params;

    if (algo == "BFS") {
        path = await runBFS(start, end);
        const simplifiedPath = path.map((node) => {
            return {
                nodeID: node.nodeID,
                ycoord: node.coords.ycoord,
                xcoord: node.coords.xcoord,
                floor: node.floor,
                building: node.building,
                nodeType: node.nodeType,
                longName: node.longName,
                shortName: node.shortName,
            };
        });
        res.send(simplifiedPath);
    } else if (algo == "ASTAR") {
        path = await runASTAR(start, end);
        const simplifiedPath = path.map((node) => {
            return {
                nodeID: node.nodeID,
                ycoord: node.coords.ycoord,
                xcoord: node.coords.xcoord,
                floor: node.floor,
                building: node.building,
                nodeType: node.nodeType,
                longName: node.longName,
                shortName: node.shortName,
            };
        });
        res.send(simplifiedPath);
    } else if (algo == "DFS") {
        path = await runDFS(start, end);
        const simplifiedPath = path.map((node) => {
            return {
                nodeID: node.nodeID,
                ycoord: node.coords.ycoord,
                xcoord: node.coords.xcoord,
                floor: node.floor,
                building: node.building,
                nodeType: node.nodeType,
                longName: node.longName,
                shortName: node.shortName,
            };
        });
        res.send(simplifiedPath);
    }
});
export default router;
