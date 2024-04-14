import fs from "fs";

const edges: string = "./apps/backend/src/data/edges.csv";
const nodes: string = "./apps/backend/src/data/nodes.csv";

interface Coords {
    xcoord: number;
    ycoord: number;
}

export interface Node {
    nodeID: string;
    coords: Coords;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
    edges: Edge[];
}

export interface Edge {
    edgeID: string;
    start: Node;
    end: Node;
}

function createNodes(): Promise<Node[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(nodes, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                reject(err);
                return;
            }

            const lines = data.trim().split(/\r?\n/);
            const nodesArray: Node[] = lines.slice(1).map((line) => {
                line = line.replace(/\r$/, "");
                const [
                    nodeID,
                    xcoord,
                    ycoord,
                    floor,
                    building,
                    nodeType,
                    longName,
                    shortName,
                ] = line.split(",");
                return {
                    nodeID: nodeID,
                    coords: {
                        xcoord: parseInt(xcoord, 10),
                        ycoord: parseInt(ycoord, 10),
                    },
                    floor: floor,
                    building: building,
                    nodeType: nodeType,
                    longName: longName,
                    shortName: shortName,
                    edges: [],
                };
            });

            resolve(nodesArray);
        });
    });
}

function createEdges(nodeList: Node[]): Promise<Edge[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(edges, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                reject(err);
                return;
            }

            const lines = data.trim().split(/\r?\n/);
            const edgesArray: Edge[] = lines.slice(1).map((line) => {
                line = line.replace(/\r$/, "");
                const [edgeID, startID, endID] = line.split(",");
                const start = nodeList.find((node) => node.nodeID === startID);
                const end = nodeList.find((node) => node.nodeID === endID);
                if (!start || !end) {
                    throw new Error("Node not found for edge");
                }
                return {
                    edgeID: edgeID,
                    start: start,
                    end: end,
                };
            });

            resolve(edgesArray);
        });
    });
}

export async function processGraphData(): Promise<[Node[], Edge[]]> {
    const nodeList: Node[] = await createNodes();
    const edgeList: Edge[] = await createEdges(nodeList);

    // Link edges to nodes
    for (const edge of edgeList) {
        edge.start.edges.push(edge);
        edge.end.edges.push(edge);
    }

    const nodesandedges: [Node[], Edge[]] = [nodeList, edgeList];
    return nodesandedges;
}

export function convertNodeID(path: Node[]): string[] {
    const newPath: string[] = [path[0].nodeID];
    for (let i = 1; i < path.length; i++) {
        newPath.push(path[i].nodeID);
    }
    return newPath;
}

export default processGraphData();
