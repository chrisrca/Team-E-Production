import CanvasMap from "@/components/canvasmap/CanvasMap";
import SearchBar from "@/components/canvasmap/MapUI";
import axios from "axios";
import { DBNode } from "common/src/types";
// import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage() {
  const [staticNodes, setStaticNodes] = useState<DBNode[]>([]);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
  useEffect(() => {
    async function fetchNodeData() {
      try {
        const res = await axios.get("/api/nodes/");
        const newNodes: DBNode[] = [];
        res.data.forEach((node: DBNode) => {
          if (node.floor == "L1") {
            newNodes.push(node);
          }
        });
        setStaticNodes(newNodes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNodeData().then();
    async function fetchPathData() {
      try {
        const res = await axios.get(`/api/path/${start}/${end}`);
        setPathNodes(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPathData().then();
  }, [start, end]);
  return (
    <div className="z-0 relative">
      <SearchBar selection={staticNodes} start={setStart} end={setEnd} />
      <CanvasMap path={pathNodes} nodes={staticNodes} />
    </div>
  );
}
