import { processGraphData, Node } from "./graphData";
import TinyQueue from "tinyqueue";
import { euclideanDistance } from "./euclideanDistance.ts";

let startNodeIn: string;
let endNodeIn: string;

class PriorityQueue<T> extends TinyQueue<T> {
    constructor(
        items?: T[],
        private readonly comparator?: (a: T, b: T) => number,
    ) {
        super(items, comparator);
    }

    public push(...items: T[]): number {
        for (const item of items) {
            super.push(item);
        }
        return this.length;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public has(item: T): boolean {
        return this.data.includes(item);
    }
}

async function runASTAR(start: string, end: string) {
    console.log("Running A* Algorithm on Nodes:", start, end);
    startNodeIn = start;
    endNodeIn = end;
    let path: Node[] | null = [];

    await processGraphData().then((data) => {
        const nodeList: Node[] = data[0];
        let startNode, endNode;

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeID == startNodeIn) {
                startNode = nodeList[i];
            }
            if (nodeList[i].nodeID == endNodeIn) {
                endNode = nodeList[i];
            }
        }

        if (startNode === undefined || endNode === undefined) {
            console.error("Invalid Node Selected");
            return;
        }

        path = astar(startNode!, endNode!);
    });

    let distance = 0;

    for (let i = 0; i < path.length - 1; i++) {
        distance += euclideanDistance(path[i], path[i + 1]);
    }

    console.log("Path Distance: " + distance);

    return path;
}

function astar(start: Node, end: Node): Node[] | null {
    const openSet = new PriorityQueue<Node>(
        [],
        (a, b) => (fScore.get(a) || Infinity) - (fScore.get(b) || Infinity),
    );
    const cameFrom: Map<Node, Node> = new Map();
    const gScore: Map<Node, number> = new Map([[start, 0]]);
    const fScore: Map<Node, number> = new Map([
        [start, euclideanDistance(start, end)],
    ]);
    const closedSet: Set<Node> = new Set();

    openSet.push(start);

    while (!openSet.isEmpty()) {
        let current = openSet.pop()!;

        if (current === end) {
            const path: Node[] = [];
            while (current) {
                path.unshift(current);
                current = cameFrom.get(current)!;
            }
            return path;
        }

        closedSet.add(current);

        for (const edge of current.edges) {
            const neighbor = edge.start === current ? edge.end : edge.start;
            if (closedSet.has(neighbor)) continue;

            const tentativeGScore =
                gScore.get(current)! + euclideanDistance(current, neighbor);

            if (!openSet.has(neighbor)) openSet.push(neighbor);

            if (tentativeGScore >= (gScore.get(neighbor) || Infinity)) continue;

            cameFrom.set(neighbor, current);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(
                neighbor,
                tentativeGScore + euclideanDistance(neighbor, end),
            );
        }
    }
    // If the loop ends without finding a path
    console.log("Bang! It's null.");
    return null;
}

export default runASTAR;
