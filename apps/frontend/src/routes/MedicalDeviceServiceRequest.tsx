// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import {Label} from "@/components/ui/label";
// import {useState, ChangeEvent, FormEvent} from "react";
// import {MedicalDeviceServiceRequest} from "common/src/types/medicaldevicerequest.ts";
// import axios from "axios";
// //import {FormInput} from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// async function sendMedicalDeviceRequest(deviceRequest: MedicalDeviceServiceRequest){
//     axios.post("/api/medical-device", deviceRequest).then((res) => {
//        console.log(res);
//     });
// }
//
// export default function MedicalDeviceService() {
//     const handleChange = (
//         e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//     ) => {
//         const { name, value } = e.target;
//         setDeviceServices((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//     const [requests, setRequests] = useState<MedicalDeviceServiceRequest>({
//         employeeName: "",
//         priority: "",
//         location: "",
//         selectedDevice: "",
//         status: "",
//         withBalloons: false,
//     });
//
//     const [deviceServices, setDeviceServices] = useState<MedicalDeviceServiceRequest[]>(
//         [],
//     );
//
//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         deviceServices.push(requests);
//         sendMedicalDeviceRequest(requests);
//         setDeviceServices((prevRequests) => [...prevRequests, requests]);
//         setRequests({
//             employeeName: "",
//             priority: "",
//             location: "",
//             selectedDevice: "",
//             status: "",
//             withBalloons: false,
//         });
//     };
//
//     return (
//         <div className="container">
//             <form onSubmit={handleSubmit} className="rounded">
//                 <Card className="w-full max-w-sm scale-125 justify-center">
//                     <CardHeader>
//                         <CardTitle className="text-3xl text-center">Medical Device Request</CardTitle>
//                     </CardHeader>
//                     <CardContent className="grid gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="employeeName">Employee Name</Label>
//                             <Input
//                                 id="employee"
//                                 type="text"
//                                 value={requests.employeeName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="priority">Priority</Label>
//                             <Input
//                                 id="priority"
//                                 type="text"
//                                 value={requests.priority}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="location">Location</Label>
//                             <Input
//                                 id="location"
//                                 type="text"
//                                 value={requests.location}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flex flex-wrap -mx-3 mb-2 items-end">
//                             <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
//                                 <label
//                                     className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//                                     htmlFor="grid-room-num"
//                                 >
//                                     Device Type
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         id="deviceType"
//                                         name="deviceType"
//                                         value={requests.selectedDevice}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="Hospital Bed">Hospital Bed</option>
//                                         <option value="IV Pump">IV Pump</option>
//                                         <option value="Recliner">Recliner</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap -mx-3 mb-2 items-end">
//                             <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
//                                 <label
//                                     className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//                                     htmlFor="grid-room-num"
//                                 >
//                                     Status
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         id="status"
//                                         name="status"
//                                         value={requests.status}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="Unassigned">Unassigned</option>
//                                         <option value="Assigned">Assigned</option>
//                                         <option value="InProgress">In Progress</option>
//                                         <option value="Closed">Closed</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="grid gap-2">
//                             <div>
//                                 <input
//                                     className="mr-2"
//
//                                     type="checkbox"
//                                     id="balloons"
//                                     name="balloons"
//                                     value="balloons"
//                                     checked={requests.withBalloons}
//                                     onChange={handleChange}
//                                 />
//                                 <Label htmlFor="status">Deliver With Balloons?</Label>
//                             </div>
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button
//                             className="w-full bg-blue-500"
//                             type={"submit"}
//                         >
//                             {" "}
//                             Submit{" "}
//                         </Button>
//                     </CardFooter>
//                 </Card>
//             </form>
//         </div>
//     );
//
//
//     //
//     // return (
//     //     <div className="flex flex-col flex-auto justify-center items-center h-screen">
//     //         <h1 className="text-extrabold text-2xl p-10">
//     //             Medical Device Request Form
//     //         </h1>
//     //         <form onSubmit={handleSubmit} className="rounded">
//     //             <div className="flex flex-wrap -mx-3 mb-6">
//     //                 {/*}
//     //                 <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//     //                     <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
//     //                         Employee Name
//     //                     </label>
//     //                     <FormInput
//     //                         type="text"
//     //                         id="employeeName"
//     //                         name="employeeName"
//     //                         value={requests.employeeName}
//     //                         onChange={handleSubmit}
//     //                         required
//     //                         placeholder="First Last"
//     //                     />
//     //                 </div>
//     //                 */}
//     //                 <div className="w-full md:w-1/2 px-3">
//     //                     <label
//     //                         className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//     //                         htmlFor="grid-room-num"
//     //                     >
//     //                         Priority
//     //                     </label>
//     //                     <select
//     //                         id="priority"
//     //                         name="priority"
//     //                         value={requests.priority}
//     //                         onChange={handleChange}
//     //                     >
//     //                         <option value="Low">Low</option>
//     //                         <option value="Medium">Medium</option>
//     //                         <option value="High">High</option>
//     //                         <option value="Emergency">Emergency</option>
//     //                     </select>
//     //                 </div>
//     //             </div>
//     //             <div className="flex flex-wrap -mx-3 mb-6">
//     //                 <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//     //                     <label
//     //                         className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//     //                         htmlFor="grid-room-num"
//     //                     >
//     //                         Location
//     //                     </label>
//     //                     <FormInput
//     //                         type="text"
//     //                         id="location"
//     //                         name="location"
//     //                         value={requests.location}
//     //                         // onChange={handleChange}
//     //                         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//     //                             setDeviceServices({
//     //                                 ...flowerOrder,
//     //                                 patientName: e.target.value,
//     //                             })
//     //                         }
//     //                         required
//     //                         placeholder="111"
//     //                     />
//     //                     {/*<select*/}
//     //                     {/*    id="location"*/}
//     //                     {/*    name="location"*/}
//     //                     {/*    value={requests.location}*/}
//     //                     {/*    onChange={handleChange}*/}
//     //                     {/*    required*/}
//     //                     {/*>*/}
//     //                     {/*    <option value="Hall">Hall</option>*/}
//     //                     {/*    <option value="SNRI">SNRI</option>*/}
//     //                     {/*</select>*/}
//     //                 </div>
//     //                 <div className="w-full md:w-1/2 px-3">
//     //                     <label
//     //                         className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//     //                         htmlFor="grid-room-num"
//     //                     >
//     //                         Device Type
//     //                     </label>
//     //                     <select
//     //                         id="serviceType"
//     //                         name="serviceType"
//     //                         value={requests.selectedDevice}
//     //                         onChange={handleChange}
//     //                     >
//     //                         <option value="Hospital Bed">Hospital Bed</option>
//     //                         <option value="IV Pump">IV Pump</option>
//     //                         <option value="Recliner">Recliner</option>
//     //                     </select>
//     //                 </div>
//     //             </div>
//     //             <div className="flex flex-wrap -mx-3 mb-2 items-end">
//     //                 <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
//     //                     <label
//     //                         className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
//     //                         htmlFor="grid-room-num"
//     //                     >
//     //                         Status
//     //                     </label>
//     //                     <div className="relative">
//     //                         <select
//     //                             id="status"
//     //                             name="status"
//     //                             value={requests.status}
//     //                             onChange={handleChange}
//     //                         >
//     //                             <option value="Unassigned">Unassigned</option>
//     //                             <option value="Assigned">Assigned</option>
//     //                             <option value="InProgress">InProgress</option>
//     //                             <option value="Closed">Closed</option>
//     //                         </select>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //
//     //             <div>
//     //                 <input
//     //                     className="mr-2"
//     //
//     //                     type="checkbox"
//     //                     id="balloons"
//     //                     name="balloons"
//     //                     value="balloons"
//     //                     checked={requests.withBalloons}
//     //                     onChange={handleChange}
//     //                 />
//     //                 <label htmlFor="status">Deliver With Balloons?</label>
//     //             </div>
//     //
//     //             <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//     //                 <button
//     //                     className="bg-blue-900 hover:bg-transparent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
//     //                     type={"submit"}
//     //                 >
//     //                     Submit
//     //                 </button>
//     //             </div>
//     //         </form>
//     //     </div>
//     // );
// }

import { ChangeEvent, FormEvent, useState } from "react";
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
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setMedicalDeviceData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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
                            value={medicalDeviceData.priority}
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
                        <FormInput
                            type="text"
                            id="Location"
                            name="location"
                            value={medicalDeviceData.location}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                        <input
                            className="mr-2"
                            type="checkbox"
                            id="balloons"
                            name="balloons"
                            value="balloons"
                            checked={medicalDeviceData.withBalloons}
                            onChange={handleChange}
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
