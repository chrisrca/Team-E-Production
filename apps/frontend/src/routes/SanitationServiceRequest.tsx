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

// bare-bone basics for flower request form, template taken from tailwind
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
        <div className="fullDiv text-center">
            <div className="">
                <h1 className={"text-3xl font-HeadlandOne py-4"}>
                    Welcome to the Sanitation Request page!
                </h1>
                <p>
                    Fill out the form below to report an issue and make a
                    sanitation request.
                </p>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div className="columns-2">
                    <label>Name of the employee making the request:</label>
                    <br />
                    <input
                        type="text"
                        value={sanitationRequest.patientName}
                        onChange={(e) =>
                            setSanitationRequest({
                                ...sanitationRequest,
                                patientName: e.target.value,
                            })
                        }
                    />
                    <div>
                        <br />
                        <div>
                            <label>
                                Location of the request in the building:
                            </label>
                            <br />
                            <input
                                className="bg-secondary"
                                type="text"
                                name="location"
                                value={sanitationRequest.location}
                                onChange={(e) =>
                                    setSanitationRequest({
                                        ...sanitationRequest,
                                        location: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <br />
                        <br />
                        <label>Priority of the request:</label>
                        <br />
                        <select
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
                        <div>
                            <label>Service Type:</label>
                            <br />
                            {/* Placeholder for service type */}
                            <select
                                value={sanitationRequest.serviceType}
                                onChange={(e) =>
                                    setSanitationRequest({
                                        ...sanitationRequest,
                                        serviceType: e.target.value,
                                    })
                                }
                            >
                                {Object.values(Service).map((serviceType) => (
                                    <option
                                        key={serviceType}
                                        value={serviceType}
                                    >
                                        {serviceType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Status of the request:</label> <br />
                            <select
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
                </div>
                <div>
                    <label>Additional Information:</label> <br />
                    {/* Placeholder for additional info */}
                    <textarea
                        value={sanitationRequest.additionalInfo}
                        onChange={(e) =>
                            setSanitationRequest({
                                ...sanitationRequest,
                                additionalInfo: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="width:50%">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
