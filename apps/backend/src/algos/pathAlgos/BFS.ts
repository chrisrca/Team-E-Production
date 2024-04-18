import { Node } from "../graphData.ts";

export default function bfs(start: Node, end: Node): Node[] | null {
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
