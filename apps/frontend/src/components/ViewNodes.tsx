// import { DBNode } from "common/src/types";
// import { useEffect, useState } from "react";
// import axios from "axios";

// doesn't include object property edges in table
export default function ViewNodes(/*dataArr: Node[]*/) {
  return (
    <div className="pt-5 p-5 relative flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Node Data</h1>
      <table className="border-collapse border-spacing-2 border border-slate-400">
        <thead>
          <tr>
            <th className={"border border-primary"}>NodeID</th>
            <th className={"border border-primary"}>X-Coord</th>
            <th className={"border border-primary"}>Y-Coord</th>
            <th className={"border border-primary"}>Floor</th>
            <th className={"border border-primary"}>Node Type</th>
            <th className={"border border-primary"}>Building</th>
            <th className={"border border-primary"}>Long Name</th>
            <th className={"border border-primary"}>Short Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {nodeData.map((currentValue, index) => (
            <tr key={index} className="border border-primary p-1">
              <td className="border border-primary p-1">{currentValue.nodeID}</td>
              <td className="border border-primary p-1">{currentValue.xcoord}</td>
              <td className="border border-primary p-1">{currentValue.ycoord}</td>
              <td className="border border-primary p-1">{currentValue.floor}</td>
              <td className="border border-primary p-1">{currentValue.nodeType}</td>
              <td className="border border-primary p-1">{currentValue.building}</td>
              <td className="border border-primary p-1">{currentValue.longName}</td>
              <td className="border border-primary p-1">{currentValue.shortName}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
