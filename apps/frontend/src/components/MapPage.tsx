import CanvasMap from "@/components/canvasmap/CanvasMap";
import SearchBar from "@/components/canvasmap/MapUI";
//import { Node } from "common/src/types";
// import NodeDisplay from "@/components/NodeDisplay.tsx";

export default function MapPage() {
  return (
    <div className="z-0 relative">
      <SearchBar />

      {/*<NodeDisplay node={myNode}/>*/}
      <CanvasMap />
    </div>
  );
}
