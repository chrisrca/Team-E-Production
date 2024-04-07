import express, { Request, Response } from "express";
import client from "../bin/database-connection.ts";
import { FlowerServiceRequest } from "common/src/types"; // Adjust the path accordingly

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Flower data received:", fileContent);

        // Split the fileContent string into individual rows
        const rows = fileContent.split("\n");

        // Iterate over each row and insert it into the database
        for (let i = 1; i < rows.length; i++) {
            // Start from index 1 to skip the header row
            const row = rows[i];
            const [
                patientName,
                roomNumber,
                senderName,
                cardMessage,
                flowerType,
                status,
                priority,
            ] = row.split(",");

            // Create a FlowerServiceRequest object
            const flowerData: FlowerServiceRequest = {
                patientName,
                roomNumber,
                senderName,
                cardMessage,
                flowerType,
                status,
                priority,
            };

            // Insert flowerData into the database
            await client.flower.create({
                data: {
                    patientName: flowerData.patientName,
                    roomNumber: parseInt(flowerData.roomNumber), // Ensure roomNumber is parsed as an integer
                    senderName: flowerData.senderName,
                    cardMessage: flowerData.cardMessage,
                    flowerType: flowerData.flowerType,
                    status: flowerData.status,
                    priority: flowerData.status,
                },
            });
        }

        res.send("Flowers added to database");
    } catch (error) {
        console.error("Error uploading flower data:", error);
        res.status(500).send("Failed to add flowers to database");
    }
});

export default router;
