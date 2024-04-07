import "./index.css";
import Login from "./routes/Login.tsx";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import { ServiceRequests } from "@/routes/ServiceRequests.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";
import DrugDelivery from "@/routes/MedicineDeliveryRequest.tsx";

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
                    <Route path="/drug-service" element={<DrugDelivery />} />
                    <Route path="/data" element={<DataViewer />} />
                    <Route path="/services" element={<ServiceRequests />} />
                </Routes>
                <div className="fixed z-50 bottom-0 pb-2 pl-2">
                    <ModeToggle />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
