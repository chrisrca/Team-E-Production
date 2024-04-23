import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import SearchBar from "@/components/canvasmap/map/MapUI.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
// import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button.tsx";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("ASTAR");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);

    const handleRandomize = () => {
        const nonHallNodes = nodes
            .filter((node) => {
                return node.nodeType != "HALL";
            });
        const randomStart = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const randomEnd = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const algorithms = ["ASTAR", "Dijkstra", "BFS", "DFS"];
        const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];

        setStart(randomStart);
        setEnd(randomEnd);
        setAlgorithm(randomAlgo);
    };

    useEffect(() => {
        async function fetchPathData() {
            try {
                let res;
                if (!algorithm) {
                    res = await axios.get(
                        `/api/path/${start}/${end}/${"ASTAR"}`,
                    );
                } else {
                    res = await axios.get(
                        `/api/path/${start}/${end}/${algorithm}`,
                    );
                }

                setPathNodes(res.data);
            } catch (error) {
                setPathNodes([]);
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm]);
    return (
        <div className="z-0 relative">
            <SearchBar
                selection={nodes}
                start={[start, setStart]}
                end={[end, setEnd]}
                algorithm={[algorithm, setAlgorithm]}
            />
            <LevelButtons levelProps={[level, setLevel]}/>
            <CanvasMap
                level={level}
                path={pathNodes}
                nodes={nodes}
                setLevel={setLevel}
                start={setStart}
                end={setEnd}
            />
            <div style={{position: "absolute", top: "240px", left: "60px"}}>
                <Button onClick={handleRandomize}>I'm Feeling Lucky</Button>
            </div>
        </div>
    );
}
