import express, { Router } from "express";
import { StartEnd } from "common/src/types";

const router: Router = express.Router();

const database: StartEnd[] = [];

// router.get("/:index", (req, res) => {
//   const index = parseInt(req.params.index);
//   if (index >= 0 && index < database.length) {
//     res.status(200).json(database[index]);
//   }
//   res.status(400).json({
//     message: "not a valid index",
//   });
// });

router.post("/", async (req, res) => {
  const path: StartEnd = req.body() as StartEnd;

  database.push(path);

  res.status(200).json({
    message: "added db object",
  });
});
export default router;
