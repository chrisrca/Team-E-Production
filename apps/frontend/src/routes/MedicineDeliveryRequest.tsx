import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { DrugDeliveryData } from "common/src/types/medicinerequest.ts";
import axios from "axios";
/*import tylenol from "../images/tylenol.jpg";
import advil from "../images/advil.jpg";
import melatonin from "../images/melatonin.jpg";*/

async function sendMedicineRequest(drugOrder: DrugDeliveryData) {
    axios.post("/api/medicine", drugOrder).then((res) => {
        console.log(res);
    });
}

export default function DrugDelivery() {
    const [drugOrder, setDrugOrder] = useState<DrugDeliveryData>({
        patientName: "",
        roomNumber: "",
        patientCondition: "Fever",
        drugName: "Tylenol - $5",
        drugQuantity: "",
        priority: "Low",
        status: "Unassigned",
    });

    const [drugOrderData, setDrugSchedule] = useState<DrugDeliveryData[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (drugOrder.patientName === "" || drugOrder.roomNumber === "") {
            alert("Please fill out the required fields");
            return;
        }
        drugOrderData.push(drugOrder);
        sendMedicineRequest(drugOrder);
        setDrugSchedule((prevRequest) => [...prevRequest, drugOrder]);
        //Clearing of form
        setDrugOrder({
            patientName: "",
            roomNumber: "",
            patientCondition: "Fever",
            drugName: "Tylenol - $5",
            drugQuantity: "",
            priority: "Low",
            status: "Unassigned",
        });
    };

    /*const renderDrugImage = () => {
        switch (drugOrder.drugName) {
            case "Tylenol - $5":
                return (
                    <img
                        className="object-scale-down h-48 w-96"
                        src={tylenol}
                        alt="Tylenol"
                    />
                );
            case "Advil - $7":
                return (
                    <img
                        className="object-scale-down h-48 w-96"
                        src={advil}
                        alt="Advil"
                    />
                );
            case "Melatonin - $10":
                return (
                    <img
                        className="object-scale-down h-48 w-96"
                        src={melatonin}
                        alt="Melatonin"
                    />
                );
        }
    };*/

    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <h1 className="text-extrabold text-2xl p-10">
                Medicine Delivery Request Form
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Patient Name
                        </label>
                        <FormInput
                            variant="flowers"
                            id="grid-patient-name"
                            type="text"
                            value={drugOrder.patientName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDrugOrder({
                                    ...drugOrder,
                                    patientName: e.target.value,
                                })
                            }
                            placeholder="First Last"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-room-num"
                        >
                            Room Number
                        </label>
                        <FormInput
                            variant="flowers"
                            id="grid-room-num"
                            type="number"
                            value={drugOrder.roomNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDrugOrder({
                                    ...drugOrder,
                                    roomNumber: e.target.value,
                                })
                            }
                            placeholder="Enter Room Number..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 items-end">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-drug"
                        >
                            Medicine/Drug
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-10 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={drugOrder.drugName}
                                id="grid-drug"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setDrugOrder({
                                        ...drugOrder,
                                        drugName: e.target.value,
                                    })
                                }
                            >
                                <option>Tylenol - $5</option>
                                <option>Advil - $7</option>
                                <option>Melatonin - $10</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-drug-num"
                        >
                            Drug Quantity
                        </label>
                        <FormInput
                            variant="flowers"
                            id="grid-drug-num"
                            type="number"
                            value={drugOrder.drugQuantity}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDrugOrder({
                                    ...drugOrder,
                                    drugQuantity: e.target.value,
                                })
                            }
                            placeholder="Enter Drug Quantity..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 items-end">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-drug-priority"
                        >
                            Priority
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-10 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={drugOrder.priority}
                                id="grid-drug-priority"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setDrugOrder({
                                        ...drugOrder,
                                        priority: e.target.value,
                                    })
                                }
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Emergency</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-drug-status"
                        >
                            Status
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-10 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={drugOrder.status}
                                id="grid-drug-status"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setDrugOrder({
                                        ...drugOrder,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option>Unassigned</option>
                                <option>Assigned</option>
                                <option>In progress</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <button
                        className="bg-blue-900 hover:bg-transparent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded hover:rounded-none"
                        type={"submit"}
                    >
                        Checkout
                    </button>
                </div>
            </form>
        </div>
    );
}
