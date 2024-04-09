import { ServiceRequests } from "@/components/ServiceRequests";

// interface TestSchema {
//     patientName: string;
//     roomNumber: string;
//     patientCondition: string;
// }

const defaultTestSchema = {
    patientName: "",
    roomNumber: "",
    patientCondition: "",
};

const test = [
    {
        type: "text",
        title: "text 1",
        placeholder: "text placeholder 1",
        required: true,
        id: 0,
    },
    {
        type: "select",
        title: "select 1",
        placeholder: "select placeholder 1",
        required: false,
        id: 0,
        label: "Options",
        options: ["option 1", "option 2", "option 3"],
    },
    {
        type: "text",
        title: "text 2",
        placeholder: "text placeholder 2",
        required: true,
        id: 0,
    },
];
export const ServiceRequestForm = () => {
    return ServiceRequests(test, defaultTestSchema);
};
