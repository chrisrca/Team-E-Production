import express, { Router } from "express";
import { StartEnd } from "common/src/types/start_end.ts";
// import {Edge, Node} from "common/src/types";
//import { client } from "./src/bin/database-connection";

const router: Router = express.Router();

// type NodeEdgeData = {
//   nodes: Node[];
//   edges: Edge[];
// };

// const locations: StartEnd[] = [];

// const database: NodeEdgeData = {
//   nodes: [],
//   edges: [],
// };

//this is for frontend sending start & end location
router.post("/", (req, res) => {
  const startend: StartEnd = req.body() as StartEnd;
  console.log(startend);
  // locations.push(startend);

  res.status(200).json({
    message: "added db object",
  });
});
// router.get("/:index", (req, res) => {
//   const index = parseInt(req.params.index);
//   if (index >= 0 && index < database.nodes.length) {
//     res.status(200).json(database.nodes[index]);
//   } else {
//     res.status(400).json({
//       message: "not a valid index",
//     });
//   }
// });

export default router;
