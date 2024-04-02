import { Node } from "common/src/types";

const nodes: Node[] = [
  {
    nodeID: "1",
    coords: {
      xcoord: 1,
      ycoord: 2,
    },
    floor: "2",
    building: "big one",
    nodeType: "SDFHHKJSF",
    longName: "string;",
    shortName: "string;",
    edges: [],
  },
  {
    nodeID: "1",
    coords: {
      xcoord: 1,
      ycoord: 2,
    },
    floor: "2",
    building: "big one",
    nodeType: "SDFHHKJSF",
    longName: "string;",
    shortName: "string;",
    edges: [],
  },
];

// doesn't include object property edges in table
export default function ViewNodes(/*dataArr: Node[]*/) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <h1>Node Data</h1>
      <table className="border-collapse border-spacing-2 border border-slate-400">
        <thead>
          <tr>
            <th className={"border border-slate-300"}>NodeID</th>
            <th className={"border border-slate-300"}>X-Coord</th>
            <th className={"border border-slate-300"}>Y-Coord</th>
            <th className={"border border-slate-300"}>Floor</th>
            <th className={"border border-slate-300"}>Node Type</th>
            <th className={"border border-slate-300"}>Building</th>
            <th className={"border border-slate-300"}>Long Name</th>
            <th className={"border border-slate-300"}>Short Name</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((currentValue, index) => (
            <tr key={index} className="bg-yellow-100">
              <td>{currentValue.nodeID}</td>
              <td>{currentValue.coords.xcoord}</td>
              <td>{currentValue.coords.ycoord}</td>
              <td>{currentValue.floor}</td>
              <td>{currentValue.nodeType}</td>
              <td>{currentValue.building}</td>
              <td>{currentValue.longName}</td>
              <td>{currentValue.shortName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
