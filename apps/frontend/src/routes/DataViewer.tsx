import { ViewNodes } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DBNode, Edge } from "common/src/types";

type DataViewerProps = DBNode[] | Edge[] | [];

function DataViewer() {
    const [nodeData, setNodeData] = useState<DBNode[]>([]);
    const [edgeData, setEdgeData] = useState<Edge[]>([]);
    const [currData, setCurrData] = useState<DataViewerProps>(nodeData);
    const [flowerData, setFlowerData] = useState<[]>([]);

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
            <div className="space-x-1">
                <Button onClick={() => setCurrData(nodeData)}>Node Data</Button>
                <Button onClick={() => setCurrData(edgeData)}>Edge Data</Button>
                <Button onClick={() => setCurrData(flowerData)}>
                    Flower Data
                </Button>
            </div>
            {<ViewNodes data={currData} />}
        </div>
    );
}

export default DataViewer;
