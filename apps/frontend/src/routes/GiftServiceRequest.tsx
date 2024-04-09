import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { GiftServiceRequest } from "common/src/types";
import axios from "axios";

async function sendGiftOrder(giftOrder: GiftServiceRequest) {
    axios.post("/api/gift", giftOrder).then((res) => {
        console.log(res);
    });
}

export default function GiftServiceRequest() {
    const giftOrderData = [];
    const [giftOrder, setGiftOrder] = useState<GiftServiceRequest>({
        recipientName: "",
        deliveryLocation: "",
        warmwords: "",
        giftSize: "",
        priority: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        giftOrderData.push(giftOrder);
        if (
            giftOrder.recipientName === "" ||
            giftOrder.deliveryLocation === "" ||
            giftOrder.warmwords === ""
        ) {
            alert("Please fill out all required fields.");
            return;
        }
        sendGiftOrder(giftOrder);
        setGiftOrder({
            recipientName: "",
            deliveryLocation: "",
            warmwords: "",
            giftSize: "",
            priority: "",
        });
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
                            Warm Words
                        </label>
                        <FormInput
                            variant="gift"
                            id="grid-message"
                            type="text"
                            value={giftOrder.warmwords}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setGiftOrder({
                                    ...giftOrder,
                                    warmwords: e.target.value,
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
                            <option>Normal</option>
                            <option>Urgent</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2 items-end">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <button
                            className="bg-blue-900 hover:bg-transparent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
