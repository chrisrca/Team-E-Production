import { processGraphData, Node, Edge } from "./graphData.ts";
import bfs from "./pathAlgos/BFS.ts";
import dfs from "./pathAlgos/DFS.ts";
import astar from "./pathAlgos/ASTAR.ts";

export class PathFinder {
    private strategy: PathFindingStrategy;

    constructor(strategy: PathFindingStrategy) {
        this.strategy = strategy;
    }

    executeStrategy(startId: string, endId: string): Promise<Node[] | null> {
        return this.strategy.findPath(startId, endId);
    }
}

export interface PathFindingStrategy {
    findPath(start: string, end: string): Promise<Node[] | null>;
}

export class BFS implements PathFindingStrategy {
    async findPath(start: string, end: string): Promise<Node[] | null> {
        const nodes = await getStartEnd(start, end);
        if (nodes[0] && nodes[1]) {
            return bfs(nodes[0], nodes[1]);
        }
        return null;
    }
}

export class ASTAR implements PathFindingStrategy {
    async findPath(start: string, end: string): Promise<Node[] | null> {
        const nodes = await getStartEnd(start, end);
        if (nodes[0] && nodes[1]) {
            return astar(nodes[0], nodes[1]);
        }
        return null;
    }
}

export class DFS implements PathFindingStrategy {
    async findPath(start: string, end: string): Promise<Node[] | null> {
        const nodes = await getStartEnd(start, end);
        if (nodes[0] && nodes[1]) {
            return dfs(nodes[0], nodes[1]);
        }
        return null;
    }
}

async function getStartEnd(
    start: string,
    end: string,
): Promise<(Node | null)[]> {
    const data: [Node[], Edge[]] = await processGraphData();
    const nodeList: Node[] = data[0];
    let startNode: Node | null = null;
    let endNode: Node | null = null;

    for (const node of nodeList) {
        if (node.nodeID === start) {
            startNode = node;
        }
        if (node.nodeID === end) {
            endNode = node;
        }
    }

    return [startNode, endNode];
}
