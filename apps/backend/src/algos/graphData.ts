import client from "../bin/database-connection";
// import fs from "fs";
// const edges: string = "./src/data/edges.csv";
// const nodes: string = "./src/data/nodes.csv";

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

export async function getNodesFromDatabase(): Promise<Node[]> {
    try {
        const nodes = await client.node.findMany();
        return nodes.map((node) => ({
            nodeID: node.nodeID,
            coords: {
                xcoord: node.xcoord,
                ycoord: node.ycoord,
            },
            floor: node.floor,
            building: node.building,
            nodeType: node.nodeType,
            longName: node.longName,
            shortName: node.shortName,
            edges: [],
        }));
    } catch (error) {
        console.error("Error fetching nodes from the database:", error);
        throw error;
    }
}

export async function getEdgesFromDatabase(nodeList: Node[]): Promise<Edge[]> {
    try {
        const edges = await client.edge.findMany();
        return edges.map((edge) => {
            const startNode = nodeList.find(
                (node) => node.nodeID === edge.startNodeID,
            );
            const endNode = nodeList.find(
                (node) => node.nodeID === edge.endNodeID,
            );
            if (!startNode || !endNode) {
                throw new Error("Node not found for edge");
            }
            return {
                edgeID: edge.edgeID,
                start: startNode,
                end: endNode,
            };
        });
    } catch (error) {
        console.error("Error fetching edges from the database:", error);
        throw error;
    }
}

export async function processGraphData(): Promise<[Node[], Edge[]]> {
    try {
        const nodeList: Node[] = await getNodesFromDatabase();
        const edgeList: Edge[] = await getEdgesFromDatabase(nodeList);

        // Link edges to nodes
        for (const edge of edgeList) {
            edge.start.edges.push(edge);
            edge.end.edges.push(edge);
        }
        const nodesandedges: [Node[], Edge[]] = [nodeList, edgeList];
        return nodesandedges;
    } catch (error) {
        console.error("Error processing graph data:", error);
        throw error;
    }
}
export default processGraphData();
