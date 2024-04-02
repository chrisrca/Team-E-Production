import { ViewNodes } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DBNode, Edge } from "common/src/types";
import { Input } from "@/components/ui/input";

type DataViewerProps = DBNode[] | Edge[] | [];

function DataViewer() {
    const [nodeData, setNodeData] = useState<DBNode[]>([]);
    const [edgeData, setEdgeData] = useState<Edge[]>([]);
    const [currData, setCurrData] = useState<DataViewerProps>(nodeData);
    const [flowerData, setFlowerData] = useState<[]>([]);
    const [uploadData, setUploadData] = useState<File | null | undefined>();

    const uploadCSV = async (file: File | null | undefined) => {
        if (file === null || file === undefined) {
            console.error("No file selected");
            return;
        }
        if (file.type !== "text/csv") {
            console.error("Invalid file type. Please upload a CSV file.");
            return;
        }

        // Check if the file size is less than 1MB
        const fileSizeInMB = file.size / (1024 * 1024);
        const sizeLimitInMB = 1;
        if (fileSizeInMB > sizeLimitInMB) {
            console.error(
                `File size exceeds ${sizeLimitInMB}MB limit. Please upload a smaller file.`,
            );
            return;
        }

        // Determine the API endpoint based on the currData type
        let apiEndpoint;
        if (currData === nodeData) {
            apiEndpoint = "/api/nodes/upload";
        } else if (currData === edgeData) {
            apiEndpoint = "/api/edges/upload";
        } else if (currData === flowerData) {
            apiEndpoint = "/api/flower/upload";
        } else {
            console.error("Invalid Upload Type");
            return;
        }

        // Send a POST request to the API endpoint
        try {
            const res = await axios.post(apiEndpoint, file);
            console.log(res.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    useEffect(() => {
        async function fetchNodeData() {
            try {
                const res = await axios.get("/api/nodes/");
                setNodeData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchNodeData().then();
        async function fetchEdgeData() {
            try {
                const res = await axios.get("/api/edges");
                setEdgeData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchEdgeData().then();
        async function fetchFlowerData() {
            try {
                const res = await axios.get("/api/flower");
                setFlowerData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchFlowerData().then();
    }, []);

    return (
        <div className="p-10 flex flex-auto flex-col items-center align-center">
            <div className="flex flex-row items-center">
                <div className="space-x-1 flex flex-row">
                    <Button onClick={() => setCurrData(nodeData)}>
                        Node Data
                    </Button>
                    <Button onClick={() => setCurrData(edgeData)}>
                        Edge Data
                    </Button>
                    <Button onClick={() => setCurrData(flowerData)}>
                        Flower Data
                    </Button>
                </div>
                <div className=" px-10 flex flex-col space-y-2">
                    <div className="flex flex-row px-2 space-x-2">
                        <Input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files !== null) {
                                    setUploadData(e.target.files[0]);
                                }
                            }}
                        />
                        <Button onClick={() => uploadCSV(uploadData)}>
                            Upload
                        </Button>
                    </div>

                    <Button onClick={() => console.log(currData)}>
                        Download
                    </Button>
                </div>
            </div>
            {<ViewNodes data={currData} />}
        </div>
    );
}

export default DataViewer;
