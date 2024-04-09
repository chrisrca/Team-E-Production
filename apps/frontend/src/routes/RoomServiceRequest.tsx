import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { RoomSchedulingForm } from "common/src/types";
import axios from "axios";
async function sendRoomOrder(roomOrder: RoomSchedulingForm) {
    axios.post("/api/room", roomOrder).then((res) => {
        console.log(res);
    });
}
export default function RoomScheduling() {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setRoomData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [roomData, setRoomData] = useState<RoomSchedulingForm>({
        employeeName: "",
        priority: "Low",
        location: "",
        serviceType: "Maintenance",
        status: "Unassigned",
        startTime: "",
        endTime: "",
    });

    const [roomScheduling, setRoomSchedule] = useState<RoomSchedulingForm[]>(
        [],
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        roomScheduling.push(roomData);
        sendRoomOrder(roomData);
        setRoomSchedule((prevRequests) => [...prevRequests, roomData]);
        setRoomData({
            employeeName: "",
            priority: "Low",
            location: "",
            serviceType: "Maintenance",
            status: "Unassigned",
            startTime: "",
            endTime: "",
        });
    };

    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <h1 className="text-extrabold text-2xl p-10">
                Room Schedule Request Form
            </h1>
            <form onSubmit={handleSubmit} className="rounded">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
                            Employee Name
                        </label>
                        <FormInput
                            type="text"
                            id="employeeName"
                            name="employeeName"
                            value={roomData.employeeName}
                            onChange={handleChange}
                            required
                            placeholder="First Last"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={roomData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Location
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={roomData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="Hall">Hall</option>
                            <option value="SNRI">SNRI</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Service Type
                        </label>
                        <select
                            id="serviceType"
                            name="serviceType"
                            value={roomData.serviceType}
                            onChange={handleChange}
                        >
                            <option value="Maintenance">Maintenance</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 items-end">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Status
                        </label>
                        <div className="relative">
                            <select
                                id="status"
                                name="status"
                                value={roomData.status}
                                onChange={handleChange}
                            >
                                <option value="Unassigned">Unassigned</option>
                                <option value="Assigned">Assigned</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 items-end">
                    <div>
                        <label htmlFor="startTime">Start Time:</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={roomData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endTime">End Time:</label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={roomData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <button
                        className="bg-blue-900 hover:bg-transparent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                        type={"submit"}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
