import express, { Router } from "express";
import { Test1 } from "common/src/types/test.ts";

const router: Router = express.Router();

const database: Test1[] = [];

router.post("/test", (req, res) => {
  const testData: Test1 = req.body as Test1;
  database.push(testData);
  res.status(200).json({ message: "yay" });
});

export default router;
