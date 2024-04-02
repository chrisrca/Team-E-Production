import { useEffect, useState } from "react";
import axios from "axios";

export default function LevelOne() {
  const [nodeData, setFeedbackData] = useState<[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/nodes/");
      setFeedbackData(res.data);
    }
    fetchData().then();
  }, []);
  console.log(nodeData);
  return (
    <div className="flex -mb-10">
      <img
        src="../../src/assets/00_thelowerlevel1.png"
        alt="Level 1"
        className="pt-16"
      />
    </div>
  );
}
