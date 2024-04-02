import client from "../bin/database-connection";
import express, { Request, Response } from "express";

const router = express.Router();

let flower: string;

async function getFlowersFromDB(): Promise<string> {
  flower = await client.$queryRaw`SELECT * FROM flower`;
  return flower;
}

router.post("/", async (req: Request, res: Response) => {
  const { flowerID, flowerName, flowerColor, flowerType } = req.body;
  await client.$queryRaw`INSERT INTO flower (flowerID, flowerName, flowerColor, flowerType) VALUES (${flowerID}, ${flowerName}, ${flowerColor}, ${flowerType})`;
  res.send("Flower added to database");
});

router.get("/", async (req: Request, res: Response) => {
  const msg = await getFlowersFromDB();
  res.send(msg);
});

export default router;
