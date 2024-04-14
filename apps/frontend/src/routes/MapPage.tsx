import CanvasMap from "@/components/canvasmap/CanvasMap";
import LevelButtons from "@/components/canvasmap/LevelButtons";
import SearchBar from "@/components/canvasmap/MapUI";
import axios from "axios";
import { DBNode } from "common/src/types";
// import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);

    function handleLevelChange(level: number) {
        setLevel(level);
    }

    useEffect(() => {
        async function fetchPathData() {
            try {
                const res = await axios.get(
                    `/api/path/${start}/${end}/${algorithm}`,
                );
                setPathNodes(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm]);
    return (
        <div className="z-0 relative">
            <SearchBar
                selection={nodes}
                start={setStart}
                end={setEnd}
                algorithm={setAlgorithm}
            />
            <LevelButtons updateLevel={handleLevelChange} />
            <CanvasMap
                level={level}
                path={pathNodes}
                nodes={nodes}
                setLevel={setLevel}
            />
        </div>
    );
}
