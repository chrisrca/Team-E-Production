import fs from "fs";
import { PrismaClient } from "../.prisma/client";
import { saveNodesToCSV, saveEdgesToCSV } from "./csvUtils";

const prisma = new PrismaClient();

const edges: string = "./data/edges.csv";
const nodes: string = "./data/nodes.csv";

export interface Coords {
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
  start: string;
  end: string;
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

function createEdges(): Promise<Edge[]> {
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
        const [edgeID, start, end] = line.split(",");
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

async function processGraphData(): Promise<void> {
  try {
    const nodeList: Node[] = await createNodes();
    const edgeList: Edge[] = await createEdges();

    for (let i = 0; i < edgeList.length; i++) {
      for (let j = 0; j < nodeList.length; j++) {
        if (
          nodeList[j].nodeID === edgeList[i].start ||
          nodeList[j].nodeID === edgeList[i].end
        ) {
          if (!nodeList[j].edges.includes(edgeList[i])) {
            nodeList[j].edges.push(edgeList[i]);
          }
        }
      }
    }
    //console.log(nodeList);

    // Process edges
    for (const edge of edgeList) {
      await prisma.edge.create({
        data: {
          edgeID: edge.edgeID,
          startNodeID: edge.start,
          endNodeID: edge.end,
        },
      });
    }

    for (const node of nodeList) {
      await prisma.node.create({
        data: {
          nodeID: node.nodeID,
          xcoord: node.coords.xcoord,
          ycoord: node.coords.ycoord,
          floor: node.floor,
          building: node.building,
          nodeType: node.nodeType,
          longName: node.longName,
          shortName: node.shortName,
          //ignore this "TBD" I promise it works as intended (maybe)
          edges: "TBD",
        },
      });
    }

    // After processing, save the nodes and edges to CSV files
    saveNodesToCSV(nodeList, "./processedNodes.csv");
    saveEdgesToCSV(edgeList, "./processedEdges.csv");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

async function generateAllOutput(): Promise<void> {
  const result = await prisma.$queryRaw`SELECT * FROM node`;
  console.log(result);
  const result2 = await prisma.$queryRaw`SELECT * FROM edge`;
  console.log(result2);
}

processGraphData();
generateAllOutput();

export * from "../.prisma/client";
