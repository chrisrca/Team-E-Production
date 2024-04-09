import "./index.css";
import Login from "./routes/Login.tsx";
import Welcome from "./routes/Welcome.tsx";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";
import SecurityForm from "./routes/SecurityForm";
import { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import axios from "axios";

function App() {
    const [nodes, setNodes] = useState<DBNode[]>([]);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const response = await axios.get("/api/nodes");
                setNodes(response.data);
            } catch (error) {
                console.error("Failed to fetch nodes: ", error);
            }
        }
        fetchNodes();
    }, []);

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Hamburger />
                <Routes>
                    <Route index element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<MapPage nodes={nodes} />} />
                    <Route path="/flower-service" element={<FlowerService />} />
                    <Route path="/data" element={<DataViewer />} />
                    <Route
                        path="/security"
                        element={<SecurityForm nodes={nodes} />}
                    />
                </Routes>
                <div className="fixed z-50 bottom-0 pb-2 pl-2">
                    <ModeToggle />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
