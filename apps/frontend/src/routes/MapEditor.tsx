import EditorMap from "@/components/canvasmap/mapEditor/EditorMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
import Legend from "@/components/canvasmap/map/Legend";
// import { PrismaClient } from "database";
// const client = new PrismaClient();

export default function MapEditor({ nodes }: { nodes: DBNode[] }) {
    const [pathNodes, setPathNodes] = useState<DBNode[][]>([]);
    const [level, setLevel] = useState<number>(1);

    // function handleNodeChange(node: DBNode) {
    //     async function changeNodeInfo(node: DBNode) {
    //         await client.node.update({
    //             where: {
    //                 nodeID: node.nodeID,
    //             },
    //             data: {
    //                 blocked: {
    //                     set: true,
    //                 },
    //             },
    //         });
    //     }
    //     changeNodeInfo(node);
    // }

    useEffect(() => {
        async function fetchPathData() {
            try {
                const res = await axios.get(`/api/editor`);
                setPathNodes(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, []);
    return (
        <div className="z-0 relative">
            <div className="mr-5 mb-10 absolute bottom-0 right-0 z-10">
                <Legend></Legend>
            </div>
            <LevelButtons levelProps={[level, setLevel]} />
            <EditorMap level={level} path={pathNodes} nodes={nodes} />
        </div>
    );
}
