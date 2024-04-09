import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { GiftServiceRequest } from "common/src/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import gift_box from "../assets/gift_box.webp";
import "./GiftServiceRequest.css";

async function sendGiftOrder(giftOrder: GiftServiceRequest) {
    axios.post("/api/gift", giftOrder).then((res) => {
        console.log(res);
    });
}

export default function GiftServiceRequest() {
    const [giftOrderData, setGiftOrderMany] = useState<GiftServiceRequest[]>(
        [],
    );
    const [giftOrder, setGiftOrder] = useState<GiftServiceRequest>({
        recipientName: "",
        deliveryLocation: "",
        message: "",
        giftSize: "Small",
        priority: "Low",
        wrapping: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        giftOrderData.push(giftOrder);
        if (
            giftOrder.recipientName === "" ||
            giftOrder.deliveryLocation === "" ||
            giftOrder.message === "" ||
            giftOrder.wrapping === ""
        ) {
            alert("Please fill out all required fields.");
            return;
        }
        sendGiftOrder(giftOrder);
        setGiftOrderMany((prevState) => [...prevState, giftOrder]);
        setGiftOrder({
            recipientName: "",
            deliveryLocation: "",
            message: "",
            giftSize: "",
            priority: "",
            wrapping: "",
        });
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setGiftOrder((prevRequests) => ({
            ...prevRequests,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <h1 className="text-extrabold text-2xl p-10">
                Gift Delivery Service Request Form
            </h1>
            <form onSubmit={handleSubmit} className="rounded">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
                            Recipient Name
                        </label>
                        <FormInput
                            variant="gift"
                            id="grid-recipient-name"
                            type="text"
                            value={giftOrder.recipientName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
                                    recipientName: e.target.value,
                                })
                            }
                            placeholder="Your name"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-delivery-location"
                        >
                            Delivery Location
                        </label>
                        <FormInput
                            variant="gift"
                            id="grid-delivery-location"
                            type="text"
                            value={giftOrder.deliveryLocation}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
                                    deliveryLocation: e.target.value,
                                })
                            }
                            placeholder="Enter delivery location..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-warmwords"
                        >
                            Message
                        </label>
                        <FormInput
                            variant="gift"
                            id="grid-message"
                            type="text"
                            value={giftOrder.message}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
                                    message: e.target.value,
                                })
                            }
                            placeholder="Enter message..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-gift-size"
                        >
                            Gift Size
                        </label>
                        <select
                            className="block appearance-none w-full bg-secondary border border-gray-200 text-foreground py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-secondary focus:border-gray-500"
                            value={giftOrder.giftSize}
                            id="grid-gift-size"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
                                    giftSize: e.target.value,
                                })
                            }
                        >
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-priority"
                        >
                            Priority
                        </label>
                        <select
                            className="block appearance-none w-full bg-secondary border border-gray-200 text-foreground py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-secondary focus:border-gray-500"
                            value={giftOrder.priority}
                            id="grid-priority"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
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
                <label
                    className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                    htmlFor="wrapping"
                >
                    Wrapping Paper
                </label>

                <div className="flex flex-col -mx-3 mb-6">
                    <div className="flex flex-row">
                        <label className="w-1/3">
                            <input
                                type="radio"
                                name="wrapping"
                                value="default"
                                onChange={handleChange}
                            ></input>
                            <img
                                src={gift_box}
                                alt="Gift"
                                style={{ width: "150px", height: "auto" }}
                            ></img>
                        </label>

                        <label className="w-1/3">
                            <input
                                type="radio"
                                name="wrapping"
                                value="festive"
                                onChange={handleChange}
                            ></input>
                            <img
                                src={gift_box}
                                alt="Gift"
                                style={{ width: "150px", height: "auto" }}
                            ></img>
                        </label>

                        <label className="w-1/3">
                            <input
                                type="radio"
                                name="wrapping"
                                value="boring"
                                onChange={handleChange}
                            ></input>
                            <img
                                src={gift_box}
                                alt="Gift"
                                style={{ width: "150px", height: "auto" }}
                            ></img>
                        </label>
                    </div>

                    <div className="flex flex-row text-center">
                        <p className="w-1/3 justify-center">Default - $15 </p>
                        <p className="w-1/3 justify-center">Festive - $6 </p>
                        <p className="w-1/3 justify-center">Boring - $500 </p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2 items-end">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
