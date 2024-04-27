import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth0, User} from "@auth0/auth0-react";
import { ViewNodes } from "@/components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Chart} from "./Chart.tsx";

function ProfilePage() {
    const { user } = useAuth0();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [serviceRequests, setServiceRequests] = useState<[]>([]);
    const [employeeName, setEmployeeName] = useState("");
    const [activeTab, setActiveTab] = useState("serviceType");


    useEffect(() => {
        if (user) {
            setUserInfo(user);
            if (user.name) {
                setEmployeeName(user.name);
            }
        }
        const fetchServiceRequests = async () => {
            try {
                const response = await axios.get(`/api/service-requests/${employeeName}`);
                setServiceRequests(response.data);
            } catch (error) {
                console.error(error);
                console.log(userInfo);
            }
        };

        fetchServiceRequests();
    }, [userInfo, employeeName, user]);

    const aggregateData = (key) => {
        const counts = {};
        serviceRequests.forEach(item => {
            const keyValue = item[key];
            counts[keyValue] = (counts[keyValue] || 0) + 1;
        });
        return Object.keys(counts).map(name => ({
            name,
            count: counts[name]
        }));
    };

    const chartData = aggregateData(activeTab);

    if (userInfo) return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">User Profile</h1>
                <p className="text-gray-700"> {employeeName} </p>
            </div>
            <ViewNodes data={serviceRequests}/>
            <div>
                <h1>General Service Requests</h1>
                <Tabs defaultValue="location" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="location">Location</TabsTrigger>
                        <TabsTrigger value="status">Status</TabsTrigger>
                        <TabsTrigger value="priority">Priority</TabsTrigger>
                        <TabsTrigger value="serviceType">Service Type</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Chart yMeasure="Count" sources={[{displayName: activeTab, dataKey: 'count'}]} data={chartData}
                       dataKey="count"/>
            </div>
        </div>
    );
}

export default ProfilePage;
