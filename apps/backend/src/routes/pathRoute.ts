import express, { Router } from "express";
import runBFS from "../algos/BFS";

const router: Router = express.Router();
let path;
router.get("/:start/:end", async (req, res) => {
    const { start, end } = req.params;
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
});
export default router;
