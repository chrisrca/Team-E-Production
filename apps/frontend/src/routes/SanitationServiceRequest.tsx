import { Button } from "../components/ui/button.tsx";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput.tsx";

import { FormEvent, useState } from "react";
import { SanitationServiceRequest } from "common/src/types";
import axios from "axios";

async function sendSanitationRequest(
    sanitationRequest: SanitationServiceRequest,
) {
    axios.post("/api/sanitation", sanitationRequest).then((res) => {
        console.log(res);
    });
}

enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Emergency = "Emergency",
}

enum Status {
    Unassigned = "Unassigned",
    Assigned = "Assigned",
    InProgress = "InProgress",
    Closed = "Closed",
}

enum Service {
    generalCleaning = "General",
    foodCleaning = "Food",
    hWasteCleaning = "Human Waste",
    biohazardCleaning = "Biohazard",
    otherCleaning = "Other",
}

export default function SanitationService() {
    const [sanitationRequest, setSanitationRequest] =
        useState<SanitationServiceRequest>({
            patientName: "",
            location: "",
            serviceType: "Other",
            status: "Unassigned",
            priority: "Low",
            additionalInfo: "",
        });

    const [sanitationOrderData, setSanitationService] = useState<
        SanitationServiceRequest[]
    >([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(sanitationRequest);
        if (
            sanitationRequest.patientName === "" ||
            sanitationRequest.location === ""
        ) {
            alert("Please fill out all required fields.");
            return;
        }
        //Saving of data
        sanitationOrderData.push(sanitationRequest);
        sendSanitationRequest(sanitationRequest);
        setSanitationService((prevRequests) => [
            ...prevRequests,
            sanitationRequest,
        ]);
        //Clearing of form
        setSanitationRequest({
            patientName: "",
            location: "",
            serviceType: "Other",
            status: "Unassigned",
            priority: "Low",
            additionalInfo: "",
        });
    };
    return (
        <div className="flex flex-col flex-auto justify-center items-center h-screen">
            <div className="text-center">
                <h1 className={"text-3xl font-HeadlandOne py-4"}>
                    Welcome to the Sanitation Request page!
                </h1>
                <p>
                    Fill out the form below to report an issue and make a
                    sanitation request.
                </p>
            </div>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label
                            htmlFor="employee"
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                        >
                            Name of Employee:
                        </Label>
                        <FormInput
                            variant="gift" // using same as gift for input boxes
                            type="text"
                            name="employee"
                            value={sanitationRequest.patientName}
                            onChange={(e) =>
                                setSanitationRequest({
                                    ...sanitationRequest,
                                    patientName: e.target.value,
                                })
                            }
                            placeholder="Employee's Name"
                        />
                    </div>

                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <Label
                            htmlFor="location"
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                        >
                            Location in building:
                        </Label>
                        <FormInput
                            variant="gift"
                            type="text"
                            name="location"
                            value={sanitationRequest.location}
                            onChange={(e) =>
                                setSanitationRequest({
                                    ...sanitationRequest,
                                    location: e.target.value,
                                })
                            }
                            placeholder="Location"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label
                            htmlFor="priority"
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                        >
                            Priority:
                        </Label>
                        <select
                            name="priority"
                            value={sanitationRequest.priority}
                            onChange={(e) =>
                                setSanitationRequest({
                                    ...sanitationRequest,
                                    priority: e.target.value,
                                })
                            }
                        >
                            {Object.values(Priority).map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label
                            htmlFor="type"
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                        >
                            Service Type:
                        </Label>
                        {/* Placeholder for service type */}
                        <select
                            name="type"
                            value={sanitationRequest.serviceType}
                            onChange={(e) =>
                                setSanitationRequest({
                                    ...sanitationRequest,
                                    serviceType: e.target.value,
                                })
                            }
                        >
                            {Object.values(Service).map((serviceType) => (
                                <option key={serviceType} value={serviceType}>
                                    {serviceType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <Label
                            htmlFor="status"
                            className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                        >
                            Status:
                        </Label>
                        <select
                            name="status"
                            value={sanitationRequest.status}
                            onChange={(e) =>
                                setSanitationRequest({
                                    ...sanitationRequest,
                                    status: e.target.value,
                                })
                            }
                        >
                            {Object.values(Status).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <Label
                        htmlFor="info"
                        className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2"
                    >
                        Additional Information:
                    </Label>
                    <textarea
                        name="info"
                        value={sanitationRequest.additionalInfo}
                        onChange={(e) =>
                            setSanitationRequest({
                                ...sanitationRequest,
                                additionalInfo: e.target.value,
                            })
                        }
                    />
                </div>
                <div className=" ">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}
