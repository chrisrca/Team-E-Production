import "./index.css";
import { Login } from "./components";
import LevelOne from "./components/Map-LevelOne.tsx";
import Welcome from "./components/Welcome.tsx";
import FlowerService from "@/components/FlowerServiceRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavMenu from "./components/NavMenu.tsx";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/map" element={<LevelOne />} />
          <Route path="/flower-service" element={<FlowerService />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
