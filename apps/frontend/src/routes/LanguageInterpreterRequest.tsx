import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "@/components/ui/formInput.tsx";
import { InterpreterServiceRequest } from "common/src/types"; // Assuming you have a type for interpreter service request
import axios from "axios";

async function sendInterpreterRequest(
    interpreterRequest: InterpreterServiceRequest,
) {
    axios.post("/api/interpreter", interpreterRequest).then((res) => {
        console.log(res);
    });
}

export default function InterpreterService() {
    const interpreterRequestData = [];
    const [interpreterRequest, setInterpreterRequest] =
        useState<InterpreterServiceRequest>({
            clientName: "",
            language: "",
            duration: "",
            location: "",
            additionalInfo: "",
        });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        interpreterRequestData.push(interpreterRequest);
        if (
            interpreterRequest.clientName === "" ||
            interpreterRequest.language === "" ||
            interpreterRequest.duration === "" ||
            interpreterRequest.location === ""
        ) {
            alert("Please fill out all required fields.");
            return;
        }
        sendInterpreterRequest(interpreterRequest);
        setInterpreterRequest({
            clientName: "",
            language: "",
            duration: "",
            location: "",
            additionalInfo: "",
        });
    };

    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <h1 className="text-extrabold text-2xl p-10">
                Language Interpreter Service Request Form
            </h1>
            <form onSubmit={handleSubmit} className="rounded">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
                            Client Name
                        </label>
                        <FormInput
                            variant="interpreter"
                            id="grid-client-name"
                            type="text"
                            value={interpreterRequest.clientName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInterpreterRequest({
                                    ...interpreterRequest,
                                    clientName: e.target.value,
                                })
                            }
                            placeholder="Your name"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-language"
                        >
                            Language
                        </label>
                        <FormInput
                            variant="interpreter"
                            id="grid-language"
                            type="text"
                            value={interpreterRequest.language}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInterpreterRequest({
                                    ...interpreterRequest,
                                    language: e.target.value,
                                })
                            }
                            placeholder="Enter language..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-duration"
                        >
                            Duration
                        </label>
                        <FormInput
                            variant="interpreter"
                            id="grid-duration"
                            type="text"
                            value={interpreterRequest.duration}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInterpreterRequest({
                                    ...interpreterRequest,
                                    duration: e.target.value,
                                })
                            }
                            placeholder="Enter duration..."
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-location"
                        >
                            Location
                        </label>
                        <FormInput
                            variant="interpreter"
                            id="grid-location"
                            type="text"
                            value={interpreterRequest.location}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInterpreterRequest({
                                    ...interpreterRequest,
                                    location: e.target.value,
                                })
                            }
                            placeholder="Enter location..."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                            htmlFor="grid-additional-info"
                        >
                            Additional Info
                        </label>
                        <FormInput
                            variant="interpreter"
                            id="grid-additional-info"
                            type="text"
                            value={interpreterRequest.additionalInfo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInterpreterRequest({
                                    ...interpreterRequest,
                                    additionalInfo: e.target.value,
                                })
                            }
                            placeholder="Enter additional info (optional)"
                        />
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
