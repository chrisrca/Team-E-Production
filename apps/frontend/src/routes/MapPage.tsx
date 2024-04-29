import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import SearchBar from "@/components/canvasmap/map/MapUI.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
import Legend from "@/components/canvasmap/map/Legend";
import { useEffect, useState } from "react";
import TextDirection, {
    TextDirectionComponent,
} from "@/components/TextDirection.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useLanguage } from "@/components/LanguageProvider";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("ASTAR");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);
    const [prompt, setPrompt] = useState<string[]>([""]);
    const [turn, setTurn] = useState<string[]>([""]);
    const [floor, setFloor] = useState<string[]>([""]);
    const language = useLanguage();
    const handleRandomize = () => {
        const nonHallNodes = nodes.filter((node) => {
            return node.nodeType != "HALL";
        });
        const randomStart =
            nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const randomEnd =
            nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
        const randomAlgo =
            algorithms[Math.floor(Math.random() * algorithms.length)];
        console.log(randomAlgo);
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
                const { prompts, turns, floors } = TextDirection(res.data, language);
                setPrompt(prompts);
                setTurn(turns);
                setFloor(floors);
            } catch (error) {
                setPathNodes([]);
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm, language]);

    return (
        <>
            <div className="z-0 relative flex">
                <div className="z-10">
                    <SearchBar
                        selection={nodes}
                        start={[start, setStart]}
                        end={[end, setEnd]}
                        algorithm={[algorithm, setAlgorithm]}
                    />
                    <div className="mr-5 max-h-full mb-3 absolute bottom-0 right-0 z-10">
                        <Legend/>
                    </div>
                    <LevelButtons levelProps={[level, setLevel]}/>
                    <div style={{position: "absolute", top: "400px", left: ""}}>
                        <TextDirectionComponent prompts={prompt} turns={turn} floors={floor} />
                    </div>
                    <div style={{position: "absolute", top: "240px", left: "60px"}}>
                        <Button onClick={handleRandomize}>I'm Feeling Lucky</Button>
                    </div>
                    <LevelButtons levelProps={[level, setLevel]} />
                    <div
                        style={{
                            position: "absolute",
                            top: "240px",
                            left: "60px",
                        }}
                    >
                        <Button onClick={handleRandomize}>
                            I'm Feeling Lucky
                        </Button>
                    </div>
                </div>
                <div style={{ height: "100vh", overflow: "hidden" }}>
                    <CanvasMap
                        level={level}
                        path={pathNodes}
                        nodes={nodes}
                        setLevel={setLevel}
                        start={setStart}
                        end={setEnd}
                    />
                </div>
            </div>
        </>
    );
}
