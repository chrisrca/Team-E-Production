import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SecurityServiceRequest } from "common/src/types";

const router = express.Router();

async function getSecurityFromDB(): Promise<any> {
    try {
        return await client.security.findMany();
    } catch (error) {
        console.error("Error fetching security data from DB:", error);
        throw error;
    }
}

router.post("/", async (req: Request, res: Response) => {
    const securityRequest: SecurityServiceRequest = req.body;
    try {
        const createdSecurity = await client.security.create({
            data: {
                employeeName: securityRequest.employeeName,
                employeeID: parseInt(securityRequest.employeeID),
                reqPriority: securityRequest.reqPriority,
                location: securityRequest.location,
                requestType: securityRequest.requestType,
                reqStatus: securityRequest.reqStatus,
                alertAuthorities: securityRequest.alertAuthorities,
            },
        });
        res.json({
            message: "Security form added to database",
            data: createdSecurity,
        });
    } catch (error) {
        console.error("Failed to add security form to database:", error);
        // @ts-ignore
        res.status(500).json({
            message: "Failed to add security form to database",
            error: error.message,
        });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const securityData = await getSecurityFromDB();
        res.json(securityData);
    } catch (error) {
        res.status(500).send("Failed to fetch security data from database");
    }
});

export default router;
