import * as fs from "fs";
import { Node, Edge } from "./index";

export function saveNodesToCSV(nodes: Node[], filename: string) {
  const headers =
    "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName";
  const rows = nodes
    .map(
      (node) =>
        `${node.nodeID},${node.coords.xcoord},${node.coords.ycoord},${node.floor},${node.building},${node.nodeType},${node.longName},${node.shortName}`,
    )
    .join("\n");
  const csvData = `${headers}\n${rows}`;

  fs.writeFileSync(filename, csvData);
  console.log(`Nodes saved to ${filename}`);
}

export function saveEdgesToCSV(edges: Edge[], filename: string) {
  const headers = "edgeID,startNode,endNode";
  const rows = edges
    .map((edge) => `${edge.edgeID},${edge.start},${edge.end}`)
    .join("\n");
  const csvData = `${headers}\n${rows}`;

  fs.writeFileSync(filename, csvData);
  console.log(`Edges saved to ${filename}`);
}
