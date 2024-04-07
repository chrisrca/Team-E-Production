import "./index.css";
import Login from "./routes/Login.tsx";
import Welcome from "./routes/Welcome.tsx";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import InterpreterService from "@/routes/LanguageInterpreterRequest.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";
import DrugDelivery from "@/routes/MedicineDeliveryRequest.tsx";
import GiftServiceRequest from "@/routes/GiftServiceRequest.tsx";
import SecurityForm from "./routes/SecurityForm";
import SanitationService from "@/routes/SanitationServiceRequest.tsx";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Hamburger />
                <Routes>
                    <Route index element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/flower-service" element={<FlowerService />} />
                    <Route
                        path="/gift-service"
                        element={<GiftServiceRequest />}
                    />
                    <Route
                        path="/language-service"
                        element={<InterpreterService />}
                    />
                    <Route path="/drug-service" element={<DrugDelivery />} />
                    <Route path="/data" element={<DataViewer />} />
                    <Route path="/security" element={<SecurityForm />} />
                    <Route path="/sanitation" element={<SanitationService />} />
                </Routes>
                <div className="fixed z-50 bottom-0 pb-2 pl-2">
                    <ModeToggle />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
