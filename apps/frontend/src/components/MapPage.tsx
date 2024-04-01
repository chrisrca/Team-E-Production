import CanvasMap from "@/components/canvasmap/CanvasMap";
import SearchBar from "@/components/canvasmap/MapUI";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage() {
  return (
    <div className="z-0 relative">
      <SearchBar />

      {/*<NodeDisplay node={Node}/>*/}
      {/*  <NodeDisplay node={Node}/>*/}
      <CanvasMap />
    </div>
  );
}
