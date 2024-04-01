import { processGraphData, Node } from "./graphData";

let startNodeIn: string;
let endNodeIn: string;

async function runBFS(start: string, end: string) {
  // RENAME O
  startNodeIn = start;
  endNodeIn = end;
  //This is not good practice redo this
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

    path = bfs(startNode!, endNode!);
  });
  return path;
}

function bfs(start: Node, end: Node): Node[] | null {
  if (start.floor !== "L1" || end.floor !== "L1") {
    console.error("Error: Start or End Nodes are invalid");
    return null;
  }

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

export default runBFS;
