// import { ViewNodes } from "@/components";
// import { DBNode, Edge } from "common/src/types";
// import { useEffect, useState } from "react";
// import axios from "axios";

function DataViewer() {
  // const [nodeData, setNodeData] = useState<DBNode[]>([]);
  // const [edgeData, setEdgeData] = useState<Edge[]>([]);
  // const [currData, setCurrData] = useState([]);
  // // const [flowerData, setFlowerData] = useState<Flower[]>([]);

  // useEffect(() => {
  //     async function fetchNodeData() {
  //         try {
  //           const res = await axios.get("/api/nodes/");
  //           setNodeData(res.data);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       }
  //       fetchNodeData().then();
  //       async function fetchEdgeData() {
  //         try {
  //           const res = await axios.get("/api/edges");
  //           setNodeData(res.data);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       }
  //       fetchEdgeData().then();
  //     //   async function fetchFlowerData() {
  //     //     try {
  //     //       const res = await axios.get("/api/flower");
  //     //       setNodeData(res.data);
  //     //     } catch (error) {
  //     //       console.error("Error fetching data:", error);
  //     //     }
  //     //   }
  //     //   fetchFlowerData().then();
  // });

  return (
    <div className="flex flex-auto flex-col items-center align-center">
      <div></div>
      <h1>Data Viewer</h1>
      {/* <ViewNodes data={currData} /> */}
    </div>
  );
}

export default DataViewer;
