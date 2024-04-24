import EditorMap from "@/components/canvasmap/mapEditor/EditorMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
import React, { useEffect, useState } from "react";
import Legend from "@/components/canvasmap/map/Legend";
// import { PrismaClient } from "database";
// const client = new PrismaClient();

export default function MapEditor() {
    const [nodes, setNodes] = useState<DBNode[]>([]);
    const [pathNodes, setPathNodes] = useState<DBNode[][]>([]);
    const [level, setLevel] = useState<number>(1);
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const response = await axios.get("/api/nodes");
                setNodes(response.data);
            } catch (error) {
                console.error("Failed to fetch nodes:", error);
            }
        }
        fetchNodes();
        async function fetchPathData() {
            try {
                const res = await axios.get(`/api/editor`);
                setPathNodes(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [triggerFetch]);
    return (
        <div className="z-0 relative">
            <div className="mr-5 mb-10 absolute bottom-0 right-0 z-10">
                <Legend></Legend>
            </div>
            <LevelButtons levelProps={[level, setLevel]} />
            <EditorMap
                level={level}
                path={pathNodes}
                nodes={nodes}
                triggerRefresh={setTriggerFetch}
            />
        </div>
    );
}
