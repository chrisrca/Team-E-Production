import "./output.css"; // THIS MUST BE CREATED USE COMMAND "npx tailwind -i ./src/index.css -o ./src/output.css --watch" WHILE IN FRONTEND FOLDER DURING DEVELOPMENT
import Login from "./components/Login.tsx";
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
