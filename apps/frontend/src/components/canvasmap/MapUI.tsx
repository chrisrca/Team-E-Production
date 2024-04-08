import { DBNode } from "common/src/types";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "../../components/ui/select";
import { Button } from "../ui/button";
// import { Path } from "common/src/types";
// import axios from "axios";
// import formInput, {FormInput} from "@/components/ui/formInput.tsx";

interface PathSetFunctionProps {
    selection: DBNode[];
    start: (start: string) => void;
    end: (end: string) => void;
    algorithm: (algorithm: string) => void;
}

export default function SearchBar(PathFunctions: PathSetFunctionProps) {
    const [startPath, setStart] = useState<string>("");
    const [endPath, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("");

    const choices = PathFunctions.selection;

    async function submit() {
        PathFunctions.start(startPath);
        PathFunctions.end(endPath);
        PathFunctions.algorithm(algorithm);
    }

    function clear() {
        setEnd("");
        setStart("");
        setAlgorithm("");
    }

    return (
        <div
            className={
                "ml-10 mt-10 justify-items-center absolute z-10 text-2xl rounded-2xl p-5 flex flex-col rounded-2 float-left top-0"
            }
        >
            <div
                className={
                    "flex flex-col rounded-2 border-white drop-shadow-xl"
                }
            >
                <Select onValueChange={(e) => setStart(e)} value={startPath}>
                    <SelectTrigger>
                        <SelectValue placeholder="Start Node" />
                    </SelectTrigger>
                    <SelectContent>
                        {choices.map((node, index) => (
                            <SelectItem key={index} value={node.nodeID}>
                                {node.nodeID}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div
                className={
                    "py-5 flex flex-col rounded-2 border-white drop-shadow-xl"
                }
            >
                <Select onValueChange={(e) => setEnd(e)} value={endPath}>
                    <SelectTrigger>
                        <SelectValue placeholder="End Node" />
                    </SelectTrigger>
                    <SelectContent>
                        {choices.map((node, index) => (
                            <SelectItem key={index} value={node.nodeID}>
                                {node.nodeID}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div
                className={
                    "flex flex-col rounded-2 border-white drop-shadow-xl"
                }
            >
                <Select
                    onValueChange={(e) => setAlgorithm(e)}
                    value={algorithm}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="BFS">
                            Breadth-First Search (BFS)
                        </SelectItem>
                        <SelectItem value="ASTAR">A* (A-Star)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div
                className={
                    "mt-5 grid grid-cols-2 justify-items-center space-x-5"
                }
            >
                <Button
                    className={"w-32 px-5 py-2 rounded-3xl drop-shadow-xl"}
                    onClick={() => {
                        submit().then().catch();
                    }}
                >
                    Search
                </Button>
                <Button
                    className={"w-32 px-5 py-2 rounded-3xl drop-shadow-xl"}
                    variant="destructive"
                    onClick={clear}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}
