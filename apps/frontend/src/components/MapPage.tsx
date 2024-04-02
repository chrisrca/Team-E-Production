import CanvasMap from "@/components/canvasmap/CanvasMap";
import SearchBar from "@/components/canvasmap/MapUI";
import axios from "axios";
// import { DBNode } from "common/src/types";
import { useEffect, useState } from "react";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage() {
  const [staticNodes, setStaticNodes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/nodes/");
        setStaticNodes(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);
  return (
    <div className="z-0 relative">
      <SearchBar />
      {/*<NodeDisplay node={Node}/>*/}
      {/*  <NodeDisplay node={Node}/>*/}
      <CanvasMap nodes={staticNodes} />
    </div>
  );
}
