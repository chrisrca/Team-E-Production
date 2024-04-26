import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth0, User} from "@auth0/auth0-react";
import { FlowerServiceRequest } from "common/src/types";
import { ViewNodes } from "@/components";

function ProfilePage() {
    const { user } = useAuth0();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [serviceRequests, setServiceRequests] = useState<FlowerServiceRequest[]>([]);
    const [employeeName, setEmployeeName] = useState("");

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

    if (userInfo) return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">User Profile</h1>
                <p className="text-gray-700"> { employeeName } </p>
            </div>
            <ViewNodes data = {serviceRequests}/>
        </div>
    );
}

export default ProfilePage;
