import "./index.css";
import Login from "./routes/Login.tsx";
import Welcome from "./routes/Welcome.tsx";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import InterpreterService from "@/routes/LanguageInterpreterRequest.tsx";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import MapEditor from "@/routes/MapEditor.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";
import DrugDelivery from "@/routes/MedicineDeliveryRequest.tsx";
import GiftServiceRequest from "@/routes/GiftServiceRequest.tsx";
import SecurityForm from "./routes/SecurityForm";
import SanitationService from "@/routes/SanitationServiceRequest.tsx";
import RoomScheduling from "@/routes/RoomServiceRequest.tsx";
import MedicalDeviceService from "@/routes/MedicalDeviceServiceRequest.tsx";
import { DBNode } from "common/src/types";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/routes/Authenticated.tsx";
import UserArea from "./components/UserArea.tsx";

// import { useAxiosWithAuth } from "./hooks/useAxiosWithAuth0";

function AuthProviderWrapper({ nodes }: { nodes: DBNode[] }) {
    const navigate = useNavigate();
    // const axiosAuth = useAxiosWithAuth();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <Auth0Provider
            domain="dev-4m72lcr6jdjjoxgt.us.auth0.com"
            clientId="bIVglTpNNLUMySf32wyUYrVM17ISqXHz"
            onRedirectCallback={(appState) =>
                navigate(appState?.returnTo || window.location.pathname)
            }
            useRefreshTokens
            cacheLocation="localstorage"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "/api",
                scope: "openid profile email offline_access",
            }}
        >
            <ThemeProvider>
                <div className="flex w-screen">
                    <div>
                        <Hamburger />
                    </div>
                    <div className="ml-auto">
                        <UserArea />
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<MapPage nodes={nodes} />} />
                    <Route
                        path="/map-editor"
                        element={<MapEditor nodes={nodes} />}
                    />
                    <Route
                        path="/flower-service"
                        element={
                            <ProtectedRoute>
                                <FlowerService />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/drug-service"
                        element={
                            <ProtectedRoute>
                                <DrugDelivery />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/language-service"
                        element={
                            <ProtectedRoute>
                                <InterpreterService />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/gift-service"
                        element={
                            <ProtectedRoute>
                                <GiftServiceRequest />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sanitation"
                        element={
                            <ProtectedRoute>
                                <SanitationService />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/room-service"
                        element={
                            <ProtectedRoute>
                                <RoomScheduling />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/medical-device-service"
                        element={
                            <ProtectedRoute>
                                <MedicalDeviceService />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/data"
                        element={
                            <ProtectedRoute>
                                <DataViewer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/security"
                        element={
                            <ProtectedRoute>
                                <SecurityForm nodes={nodes} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <div className="fixed z-50 bottom-0 pb-2 pl-2">
                    <ModeToggle />
                </div>
            </ThemeProvider>
        </Auth0Provider>
    );
}

function App() {
    const [nodesIn, setNodes] = useState<DBNode[]>([]);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const response = await axios.get("/api/nodes");
                const filteredNodes = response.data.filter(
                    (node: DBNode) => node.floor === "L1",
                );
                setNodes(filteredNodes);
            } catch (error) {
                console.error("Failed to fetch nodes:", error);
            }
        }
        fetchNodes();
    }, []);

    return (
        <BrowserRouter>
            <AuthProviderWrapper nodes={nodesIn} />
        </BrowserRouter>
    );
}

export default App;
