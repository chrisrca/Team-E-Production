import express, { Router } from "express";
import { Edge, Node } from "common/src/types";
//import { client } from "./src/bin/database-connection";

const router: Router = express.Router();

type NodeEdgeData = {
  nodes: Node[];
  edges: Edge[];
};

const database: NodeEdgeData = {
  nodes: [],
  edges: [],
};

router.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < database.nodes.length) {
    res.status(200).json(database.nodes[index]);
  } else {
    res.status(400).json({
      message: "not a valid index",
    });
  }
});

export default router;
