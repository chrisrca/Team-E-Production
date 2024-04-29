import { ViewNodes } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DBNode,
    Edge,
    FlowerServiceRequest,
    GiftServiceRequest,
    InterpreterServiceRequest,
    SecurityServiceRequest,
    DrugDeliveryData,
    SanitationServiceRequest,
    RoomSchedulingForm,
    MedicalDeviceServiceRequest,
} from "common/src/types";
import { Input } from "@/components/ui/input";

type DataViewerProps =
    | Edge[]
    | DBNode[]
    | FlowerServiceRequest[]
    | GiftServiceRequest[]
    | InterpreterServiceRequest[]
    | SecurityServiceRequest[]
    | DrugDeliveryData[]
    | SanitationServiceRequest[]
    | RoomSchedulingForm[]
    | MedicalDeviceServiceRequest[]
    | [];

function DataViewer() {
    const [nodeData, setNodeData] = useState<DBNode[]>([]);
    const [edgeData, setEdgeData] = useState<Edge[]>([]);
    const [flowerData, setFlowerData] = useState<FlowerServiceRequest[]>([]);
    const [giftData, setGiftData] = useState<GiftServiceRequest[]>([]);
    const [interpreterData, setInterpreterData] = useState<
        InterpreterServiceRequest[]
    >([]);
    const [securityData, setSecurityData] = useState<SecurityServiceRequest[]>(
        [],
    );
    const [drugData, setDrugData] = useState<DrugDeliveryData[]>([]);
    const [sanitationData, setSanitationData] = useState<
        SanitationServiceRequest[]
    >([]);
    const [roomData, setRoomData] = useState<RoomSchedulingForm[]>([]);
    const [medicalDeviceData, setMedicalDeviceData] = useState<
        MedicalDeviceServiceRequest[]
    >([]);

    const [uploadData, setUploadData] = useState<File | null | undefined>();
    const [currData, setCurrData] = useState<DataViewerProps>(nodeData);

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

        // Read the content of the file as a string
        const reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target?.result) {
                const fileContent = e.target.result as string;

                // Determine the API endpoint based on the currData type
                let apiEndpoint;
                console.log(fileContent);
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

                // Send a POST request to the API endpoint with file content as a string
                try {
                    const res = await axios.post(apiEndpoint, { fileContent });
                    console.log(res.data);
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        };
        reader.readAsText(file);
    };

    const downloadCSV = () => {
        // Convert currData to CSV format
        const csvData = convertToCSV(currData);

        // Create a Blob from CSV data
        const blob = new Blob([csvData], { type: "text/csv" });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv"); // Set the filename for download

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    // Function to convert data to CSV format
    const convertToCSV = (
        data:
            | Edge[]
            | DBNode[]
            | FlowerServiceRequest[]
            | GiftServiceRequest[]
            | InterpreterServiceRequest[]
            | SecurityServiceRequest[]
            | DrugDeliveryData[]
            | SanitationServiceRequest[]
            | RoomSchedulingForm[]
            | MedicalDeviceServiceRequest[],
    ) => {
        const headers = Object.keys(data[0]).join(",");
        const csv = data.map((row) => Object.values(row).join(","));
        return headers + "\n" + csv.join("\n");
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
        async function fetchGiftData() {
            try {
                const res = await axios.get("/api/gift");
                setGiftData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchGiftData().then();

        async function fetchInterpreterData() {
            try {
                const res = await axios.get("/api/interpreter");
                setInterpreterData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchInterpreterData().then();

        async function fetchSecurityData() {
            try {
                const res = await axios.get("/api/security");
                setSecurityData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSecurityData().then();

        async function fetchDrugData() {
            try {
                const res = await axios.get("/api/medicine");
                setDrugData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDrugData().then();

        async function fetchSanitationData() {
            try {
                const res = await axios.get("/api/sanitation");
                setSanitationData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSanitationData().then();

        async function fetchRoomData() {
            try {
                const res = await axios.get("/api/room");
                setRoomData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchRoomData().then();

        async function fetchMedicalDeviceData() {
            try {
                const res = await axios.get("/api/medical-device");
                setMedicalDeviceData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchMedicalDeviceData().then();
    }, []);

    return (
        <div className="p-10 flex flex-auto flex-col items-center align-center">
            <div className="flex flex-row">
                <Select onValueChange={(value) => setCurrData(value)}>
                    <SelectTrigger className="flex h-30 w-60 bg-secondary hover:ring-2 ring-accent text-xl text-bold font-medium text-gray-700 dark:text-foreground">
                        <SelectValue placeholder={"Select a Data Type"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{"Select Data Type"}</SelectLabel>
                            <SelectItem
                                value={nodeData}
                                className={
                                    " text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Node Data"}
                            </SelectItem>
                            <SelectItem
                                value={edgeData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Edge Data"}
                            </SelectItem>
                            <SelectItem
                                value={flowerData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Flower Data"}
                            </SelectItem>
                            <SelectItem
                                value={giftData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Gift Data"}
                            </SelectItem>
                            <SelectItem
                                value={interpreterData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Interpreter Data"}
                            </SelectItem>
                            <SelectItem
                                value={securityData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Security Data"}
                            </SelectItem>
                            <SelectItem
                                value={drugData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Drug Data"}
                            </SelectItem>
                            <SelectItem
                                value={sanitationData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Sanitation Data"}
                            </SelectItem>
                            <SelectItem
                                value={roomData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Room Data"}
                            </SelectItem>
                            <SelectItem
                                value={medicalDeviceData}
                                className={
                                    "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                }
                            >
                                {"Medical Device Data"}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row px-2 space-x-2">
                        <Input
                            className="text-foreground bg-secondary"
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
                    <div className="flex flex-row px-2">
                        <Button className="w-full" onClick={downloadCSV}>
                            Download
                        </Button>
                    </div>
                </div>
            </div>
            {<ViewNodes data={currData} />}
        </div>
    );
}

export default DataViewer;
