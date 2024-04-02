import "./index.css";
import Login from "./routes/Login.tsx";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Hamburger />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/flower-service" element={<FlowerService />} />
          <Route path="/data" element={<DataViewer />} />
        </Routes>
        <div className="fixed bottom-0 pb-2 pl-2">
          <ModeToggle />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
