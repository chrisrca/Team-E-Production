import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SecurityServiceRequest } from "common/src/types";

const router = express.Router();

async function getSecurityFromDB(): Promise<SecurityServiceRequest[] | null> {
    try {
        return await client.security.findMany();
    } catch (error) {
        console.error("Error fetching security data from DB:", error);
        throw error;
    }
}

router.post("/", async (req: Request, res: Response) => {
    const securityRequest: SecurityServiceRequest = req.body;
    const boolCheck: boolean = /^true$/i.test(securityRequest.alertAuthorities);
    const intCheck: number = parseInt(securityRequest.employeeID);
    try {
        const createdSecurity = await client.security.create({
            data: {
                employeeName: securityRequest.employeeName,
                employeeID: intCheck,
                reqPriority: securityRequest.reqPriority,
                location: securityRequest.location,
                requestType: securityRequest.requestType,
                reqStatus: securityRequest.reqStatus,
                alertAuthorities: boolCheck,
            },
        });
        res.json({
            message: "Security form added to database",
            data: createdSecurity,
        });
    } catch (error) {
        console.error("Failed to add security form to database:", error);
        res.status(500).json({
            message: "Failed to add security form to database",
            error: error,
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
