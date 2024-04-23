import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import SearchBar from "@/components/canvasmap/map/MapUI.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
// import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
import TextDirection, { TextDirectionComponent }  from "@/components/TextDirection.tsx";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("ASTAR");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);

    const [prompt, setPrompt] = useState<string[]>(['']);
    const [turn, setTurn] = useState<string[]>(['']);
    //const direction = ["womp womp"];

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
                const { prompts, turns } = TextDirection(res.data);
                setPrompt(prompts);
                setTurn(turns);
            } catch (error) {
                setPathNodes([]);
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm]);

    return (
        <>
            <div className="ml-20">
                <TextDirectionComponent prompts={prompt} turns={turn}/>
            </div>
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
            </div>
        </>

    );
}
