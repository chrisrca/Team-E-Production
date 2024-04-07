import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SecurityServiceRequest } from "common/src/types";

const router = express.Router();

let security: string;

async function getSecurityFromDB(): Promise<string> {
    security = await client.$queryRaw`SELECT * FROM security`;
    return security;
}

router.post("/", async (req: Request, res: Response) => {
    const securityRequest: SecurityServiceRequest = req.body;
    try {
        await client.security.create({
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
    } catch (e) {
        console.log(e);
        res.send("Failed to add security form to database");
    }
    res.send("Security form added to database");
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getSecurityFromDB();
    res.send(msg);
});

export default router;
