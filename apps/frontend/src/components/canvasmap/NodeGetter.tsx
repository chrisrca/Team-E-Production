import NodeDisplay from "./NodeDisplay.tsx";
import { useState } from "react";
import { Node } from "common/src/types";

export default function NodeGetter() {
  const [node] = useState<Node | undefined>(undefined);
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
