import CanvasMap from "@/components/CanvasMap.tsx";
import SearchBar from "@/components/MapUI.tsx";
// import NodeDisplay from "@/components/NodeDisplay.tsx";

export default function MapPage() {
  // const myNode: Node = {
  //     id: 1,
  //     xCoord: 10,
  //     yCoord: 20
  // };
  return (
    <div className="z-0 relative">
      <SearchBar />

      {/*<NodeDisplay node={myNode}/>*/}
      <CanvasMap />
    </div>
  );
}
