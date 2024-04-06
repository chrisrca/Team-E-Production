import CanvasMap from "@/components/canvasmap/CanvasMap";
// import SearchBar from "@/components/canvasmap/MapUI";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

const MapPage = () => {
    return (
        <div className="map-page">
            {/*<SearchBar />*/}
            <CanvasMap />
        </div>
    );
};

export default MapPage;
