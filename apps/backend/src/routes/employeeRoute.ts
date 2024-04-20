import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { EmployeeType } from "common/src/types";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const employeeReq: EmployeeType = req.body;
    try {
        await client.employee.create({
            data: {
                name: employeeReq.name,
                nickname: employeeReq.nickname,
                phone_number: employeeReq.phone_number,
            },
        });
        res.send("Employee added to database"); // Send success message here inside try block
    } catch (e) {
        console.error(e); // Log the error to console
        res.status(500).send("Failed to add employee to database"); // Send failure message with status code
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const employee = await client.$queryRaw`SELECT * FROM employee`;
        res.send(employee); // Directly send the fetched employee
    } catch (e) {
        console.error(e); // Log the error to console
        res.status(500).send("Failed to retrieve employees");
    }
});

export default router;
