import "./index.css";
import { Login } from "./components";
import LevelOne from "./components/Map-LevelOne.tsx";
import FlowerService from "@/components/FlowerServiceRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Hamburger />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<LevelOne />} />
          <Route path="/flower-service" element={<FlowerService />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
