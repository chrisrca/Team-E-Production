import { processGraphData, Node } from "./graphData";
import { euclideanDistance } from "./euclideanDistance.ts";

let startNodeIn: string;
let endNodeIn: string;

async function runDFS(start: string, end: string) {
    console.log("Running DFS Algorithm on Nodes:", start, end);
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

        path = dfs(startNode!, endNode!);
    });

    let distance = 0;

    for (let i = 0; i < path.length - 1; i++) {
        distance += euclideanDistance(path[i], path[i + 1]);
    }

    console.log("Path Distance: " + distance);

    return path;
}

function dfs(start: Node, end: Node): Node[] | null {
    const queue: Node[] = [start];
    const visited: Set<Node> = new Set([start]);
    const parentMap: Map<Node, Node> = new Map();

    while (queue.length > 0) {
        let current: Node = queue.shift() as Node;

        // When the end is found, reconstruct the path from end to start
        if (current === end) {
            const path: Node[] = [];
            while (current) {
                path.unshift(current);
                current = parentMap.get(current) as Node;
            }
            return path;
        }

        // Explore neighbors
        for (const edge of current.edges) {
            const neighbor = edge.start === current ? edge.end : edge.start;
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                parentMap.set(neighbor, current); // Track the path
            }
        }
    }
    // If the loop ends without finding a path
    console.log("Bang! It's null.");
    return null;
}

export default runDFS;
