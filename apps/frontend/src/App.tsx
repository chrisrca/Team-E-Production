import "./index.css";
import Login from "./components/Login.tsx";
import FlowerService from "@/components/FlowerServiceRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/components/MapPage.tsx";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Hamburger />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/flower-service" element={<FlowerService />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
