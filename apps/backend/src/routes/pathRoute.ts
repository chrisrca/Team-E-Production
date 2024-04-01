import express, { Router } from "express";
import { Path } from "common/src/Path.ts";

const router: Router = express.Router();

const database: Path[] = [];

router.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < database.length) {
    res.status(200).json(database[index]);
  }
  res.status(400).json({
    message: "not a valid index",
  });
});

router.post("/", (req, res) => {
  const path: Path = req.body();

  database.push(path);

  res.status(200).json({
    message: "added db object",
  });
});
export default router;
