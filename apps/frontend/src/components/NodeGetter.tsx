import NodeDisplay from "./NodeDisplay.tsx";
import { useState, useEffect } from "react";
import { node } from "common/src/node.ts";
// import axios from "axios";
// import { Node } from "postcss";

export default function NodeGetter() {
  const [node, setNode] = useState<node | undefined>(undefined);
  useEffect(() => {
    setNode({
      id: "",
      xCoord: 0,
      yCoord: 0,
      //axios.get("/api/node").then((res: { data: SetStateAction<node | undefined>; }) => {
      //setNode(res.data);
      //}),
      //start: "ACONF00102"
      //end: "ACONF00103"
    });
  }, []);
  return (
    <div>
      {node !== undefined ? (
        <NodeDisplay node={node}></NodeDisplay>
      ) : (
        <div>no node</div>
      )}
    </div>
  );
}
