import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { Employee } from "common/src/types";

const router = express.Router();

let employee: string;

async function getEmployeesFromDB(): Promise<string> {
    employee = await client.$queryRaw`SELECT * FROM employee`;
    return employee;
}

router.post("/", async (req: Request, res: Response) => {
    const employeeRequest: Employee = req.body;
    try {
        await client.employee.create({
            data: {
                name: employeeRequest.name,
                nickname: employeeRequest.nickname,
                phone_number: employeeRequest.phone_number,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to add employee to database");
    }
    res.send("Employee added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getEmployeesFromDB();
    res.send(msg);
});

export default router;
