import { DBNode } from "common/src/types";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "../../ui/select.tsx";
import Legend from "./Legend.tsx";
// import { Path } from "common/src/types";
// import axios from "axios";
// import formInput, {FormInput} from "@/components/ui/formInput.tsx";

interface PathSetFunctionProps {
    selection: DBNode[];
    start: [startPath: string, (start: string) => void];
    end: [endPath: string, (end: string) => void];
    algorithm: [algorithmChoice: string, (algorithm: string) => void];
}

export default function SearchBar(PathFunctions: PathSetFunctionProps) {
    const startFunction = PathFunctions.start[1];
    const endFunction = PathFunctions.end[1];
    const algorithmFunction = PathFunctions.algorithm[1];
    const startPath = PathFunctions.start[0];
    const endPath = PathFunctions.end[0];
    const algorithm = PathFunctions.algorithm[0];
    const choices = removeHallNodes(PathFunctions.selection);

    function removeHallNodes(nodes: DBNode[]): DBNode[] {
        return nodes
            .filter((node) => {
                return node.nodeType != "HALL";
            })
            .sort(function (a, b) {
                if (a.longName < b.longName) {
                    return -1;
                }
                if (a.longName > b.longName) {
                    return 1;
                }
                return 0;
            });
    }

    return (
        <>
            <div className="mr-5 mb-10 absolute bottom-0 right-0 z-10">
                <Legend></Legend>
            </div>
            <div
                className={
                    "ml-10 mt-10 w-[300px] justify-items-center absolute z-10 text-2xl rounded-2xl p-5 flex flex-col rounded-2 float-left top-0"
                }
            >
                <div
                    className={
                        "flex flex-col rounded-2 border-white drop-shadow-xl"
                    }
                >
                    <Select
                        onValueChange={(e) => startFunction(e)}
                        value={startPath}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Start Node" />
                        </SelectTrigger>
                        <SelectContent>
                            {choices.map((node, index) => (
                                <SelectItem key={index} value={node.nodeID}>
                                    {node.longName}
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
                    <Select
                        onValueChange={(e) => endFunction(e)}
                        value={endPath}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="End Node" />
                        </SelectTrigger>
                        <SelectContent>
                            {choices.map((node, index) => (
                                <SelectItem key={index} value={node.nodeID}>
                                    {node.longName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col rounded-2 border-white drop-shadow-xl">
                    <Select
                        value={algorithm}
                        onValueChange={(value) => algorithmFunction(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="A* (A-Star)" />
                        </SelectTrigger>
                        <SelectContent defaultValue="ASTAR">
                            <SelectItem value="BFS">
                                Breadth-First Search (BFS)
                            </SelectItem>
                            <SelectItem value="ASTAR">A* (A-Star)</SelectItem>
                            <SelectItem value="DFS">
                                Depth-First Search (DFS)
                            </SelectItem>
                            <SelectItem value="DIJKSTRA">
                                Dijkstra
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}
