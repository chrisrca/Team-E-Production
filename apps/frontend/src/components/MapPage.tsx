import CanvasMap from "@/components/CanvasMap.tsx";
import SearchBar from "@/components/MapUI.tsx";

export default function MapPage() {
  return (
    <div className="z-0 relative">
      <SearchBar />

      <CanvasMap />
    </div>
  );
}
