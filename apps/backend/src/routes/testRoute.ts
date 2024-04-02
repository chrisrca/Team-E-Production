import express, { Router } from "express";
// import { Test1 } from "common/src/types/test.ts";

const router: Router = express.Router();

const database: Test1[] = [];

type Test1 = {
    name: string;
    name2: string;
};
router.post("/", (req, res) => {
    const testData: Test1 = req.body as Test1;
    database.push(testData);
    res.status(200).json({ message: "yay" });
});

router.get("/", (req, res) => {
    res.json(database);
});

export default router;
