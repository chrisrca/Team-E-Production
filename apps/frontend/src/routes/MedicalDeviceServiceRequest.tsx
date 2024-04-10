import { FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { MedicalDeviceServiceRequest } from "common/src/types";
import axios from "axios";
async function sendMedicalDeviceOrder(
    medicalDeviceOrder: MedicalDeviceServiceRequest,
) {
    axios.post("/api/medical-device", medicalDeviceOrder).then((res) => {
        console.log(res);
    });
}
export default function MedicalDeviceServiceRequest() {
    const [medicalDeviceData, setMedicalDeviceData] =
        useState<MedicalDeviceServiceRequest>({
            employeeName: "",
            priority: "Low",
            location: "",
            selectedDevice: "Hospital Bed",
            status: "Unassigned",
            withBalloons: false,
        });

    const [medicalDeviceRequest, setMedicalDevice] = useState<
        MedicalDeviceServiceRequest[]
    >([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        medicalDeviceRequest.push(medicalDeviceData);
        sendMedicalDeviceOrder(medicalDeviceData);
        setMedicalDevice((prevRequests) => [
            ...prevRequests,
            medicalDeviceData,
        ]);
        setMedicalDeviceData({
            employeeName: "",
            priority: "Low",
            location: "",
            selectedDevice: "Hospital Bed",
            status: "Unassigned",
            withBalloons: false,
        });
    };

    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <h1 className="text-extrabold text-2xl p-10">
                Medical Device Request Form
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
                            value={medicalDeviceData.employeeName}
                            onChange={(e) =>
                                setMedicalDeviceData({
                                    ...medicalDeviceData,
                                    employeeName: e.target.value,
                                })
                            }
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
                            value={medicalDeviceData.priority}
                            onChange={(e) =>
                                setMedicalDeviceData({
                                    ...medicalDeviceData,
                                    priority: e.target.value,
                                })
                            }
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
                        <FormInput
                            type="text"
                            id="Location"
                            name="location"
                            value={medicalDeviceData.location}
                            onChange={(e) =>
                                setMedicalDeviceData({
                                    ...medicalDeviceData,
                                    location: e.target.value,
                                })
                            }
                            required
                            placeholder="111"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Device Type
                        </label>
                        <select
                            id="deviceType"
                            name="deviceType"
                            value={medicalDeviceData.selectedDevice}
                            onChange={(e) =>
                                setMedicalDeviceData({
                                    ...medicalDeviceData,
                                    selectedDevice: e.target.value,
                                })
                            }
                        >
                            <option value="Hospital Bed">Hospital Bed</option>
                            <option value="IV Pump">IV Pump</option>
                            <option value="Recliner">Recliner</option>
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
                                value={medicalDeviceData.status}
                                onChange={(e) =>
                                    setMedicalDeviceData({
                                        ...medicalDeviceData,
                                        status: e.target.value,
                                    })
                                }
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
                        <input
                            className="mr-2"
                            type="checkbox"
                            id="balloons"
                            name="balloons"
                            value="balloons"
                            checked={medicalDeviceData.withBalloons}
                            onChange={(e) =>
                                setMedicalDeviceData({
                                    ...medicalDeviceData,
                                    withBalloons: e.target.checked,
                                })
                            }
                        />
                        <label htmlFor="status">Deliver With Balloons?</label>
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
