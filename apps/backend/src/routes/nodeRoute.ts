import express, { Router } from "express";
import { node } from "common/src/node.ts";

const router: Router = express.Router();

const database: node[] = [];

router.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < database.length) {
    res.status(200).json(database[index]);
  } else {
    res.status(400).json({
      message: "not a valid index",
    });
  }
});

export default router;
