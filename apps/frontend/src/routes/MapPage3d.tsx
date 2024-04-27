import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import SearchBar from "@/components/canvasmap/map/MapUI.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
import Legend from "@/components/canvasmap/map/Legend";
import { useEffect, useState } from "react";
import Map3d from "@/components/canvasmap/Map3d/Map3d";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage3d({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("ASTAR");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);

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
        <>
            <div className="z-0 relative flex">
                <div className="z-10">
                    <SearchBar
                        selection={nodes}
                        start={[start, setStart]}
                        end={[end, setEnd]}
                        algorithm={[algorithm, setAlgorithm]}
                    />
                    <div className="mr-5 max-h-full mb-10 absolute bottom-0 right-0 z-10">
                        <Legend />
                    </div>
                    <LevelButtons levelProps={[level, setLevel]} />
                </div>
                <Map3d pathNodes={pathNodes} level={level} nodes={nodes} setStart={setStart} setEnd={setEnd} setLevel={setLevel}/>
            </div>
        </>
    );
}
