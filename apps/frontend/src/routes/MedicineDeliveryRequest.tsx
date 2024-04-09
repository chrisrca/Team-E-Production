import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { DrugDeliveryData } from "common/src/types/medicinerequest.ts";
import axios from "axios";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import MedicineStore from "@/images/medicinestore.jpg";
import Tylenol from "@/images/tylenol.jpg";
import Advil from "@/images/advil.jpg";
import Melatonin from "@/images/melatonin.jpg";

async function sendMedicineRequest(drugOrder: DrugDeliveryData) {
    axios.post("/api/medicine", drugOrder).then((res) => {
        console.log(res);
    });
}

export default function DrugDelivery() {
    const drugOrderData = [];
    const [drugOrder, setDrugOrder] = useState<DrugDeliveryData>({
        patientName: "",
        roomNumber: "",
        patientCondition: "Fever",
        drugName: "Tylenol - $5",
        drugQuantity: "",
        priority: "Low",
        status: "Unassigned",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        drugOrderData.push(drugOrder);

        if (drugOrder.patientName === "" || drugOrder.roomNumber === "") {
            alert("Please fill out the required fields");
            return;
        }
        sendMedicineRequest(drugOrder);
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

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    /*flex flex-col flex-auto justify-center items-center max-w-4xl mx-auto my-10 p-8 shadow rounded-lg*/
    return (
        <div className="mx-auto pr-20 pl-20">
            <div className="">
                {/*Advert Carousel*/}
                <Carousel
                    className=""
                    setApi={setApi}
                    plugins={[
                        Autoplay({
                            delay: 10000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <div
                                className="mt-3 rounded-lg"
                                style={{
                                    backgroundImage: `url(${MedicineStore})`,
                                    backgroundSize: "cover",
                                    minHeight: "300px",
                                    backgroundPosition: "center",
                                }}
                            >
                                <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                    Request medication here!
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            Order medicine to be safely
                                            delivered to your destination!
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div
                                className="mt-3 rounded-lg"
                                style={{
                                    backgroundImage: `url(${Tylenol})`,
                                    backgroundSize: "cover",
                                    minHeight: "300px",
                                    backgroundPosition: "center",
                                }}
                            >
                                <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                    Tylenol
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            For those suffering with fevers
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div
                                className="mt-3 rounded-lg"
                                style={{
                                    backgroundImage: `url(${Advil})`,
                                    backgroundSize: "cover",
                                    minHeight: "300px",
                                    backgroundPosition: "center",
                                }}
                            >
                                <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                    Advil
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            To help with body sores
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div
                                className="mt-3 rounded-lg"
                                style={{
                                    backgroundImage: `url(${Melatonin})`,
                                    backgroundSize: "cover",
                                    minHeight: "300px",
                                    backgroundPosition: "center",
                                }}
                            >
                                <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                    Melatonin
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            For those suffering with insomnia
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="" />
                    <CarouselNext className="" />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                    {current} of {count}
                </div>
            </div>

            <h1 className="text-extrabold text-3xl p-10 items-center text-center">
                Medicine Delivery Request Form
            </h1>
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex flex-col flex-auto my-10 p-8 shadow rounded-lg max-w-lg"
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2">
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
                            className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2"
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
                            className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2"
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
                            className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2"
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
                            className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2"
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
                            className="block uppercase text-foreground tracking-wide text-xs font-bold mb-2"
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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type={"submit"}
                    >
                        Checkout
                    </button>
                </div>
            </form>
            <footer className="mt-8 text-center text-sm text-gray-500">
                Developed by Tri Vien Le and Brendan Reilly
            </footer>
        </div>
    );
}
