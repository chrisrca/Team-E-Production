import EditorMap from "@/components/canvasmap/EditorMap";
import LevelButtons from "@/components/canvasmap/LevelButtons";
import axios from "axios";
import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [pathNodes, setPathNodes] = useState<DBNode[][]>([]);
    const [level, setLevel] = useState<number>(1);

    function handleLevelChange(level: number) {
        setLevel(level);
    }

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
            <LevelButtons updateLevel={handleLevelChange} />
            <EditorMap level={level} path={pathNodes} nodes={nodes} />
        </div>
    );
}
