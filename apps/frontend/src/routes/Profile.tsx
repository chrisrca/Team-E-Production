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
    const [adminPerm, setAdminPerm] = useState(false);


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

        const checkEmployeeAdmin = async () => {
            try {
                const response = await axios.get(`/employees/${employeeName}/boolean`);
                if (response.data) {
                    const { name, booleanValue } = response.data;
                    console.log(`${name}'s boolean value is: ${booleanValue}`);
                    setAdminPerm(booleanValue);
                } else {
                    console.error('Failed to fetch employee data');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchServiceRequests();
        checkEmployeeAdmin();
    }, [userInfo, employeeName, user]);

    if (userInfo) return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">User Profile</h1>
                <p className="text-gray-700"> { employeeName } </p>
                {adminPerm ? "Admin!" : null}
            </div>
            <ViewNodes data = {serviceRequests}/>
        </div>
    );
}

export default ProfilePage;
