
import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    clientName: "",
    language: "",
    location: "",
    priority: "",
    status: "",
    duration: "",
    additionalInfo: "",
};

//Label is necessary, ids are calculated assuming that there is a title


const defaultForm = [
    {
        content: "label",
        title: "Language Interpreter Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Client Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Language",
        placeholder: "Enter Language",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Location",
        placeholder: "Enter Location",
        required: true,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Priority",
        placeholder: "Please Select Priority",
        required: true,
        id: 0,
        label: "Priority",
        options: ["Low", "Medium", "High", "Emergency",],
    },
    {
        content: "select",
        type: "string",
        title: "Status",
        placeholder: "Please Select Status",
        required: true,
        id: 0,
        label: "Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed",],
    },
    {
        content: "text",
        type: "string",
        title: "Duration",
        placeholder: "Enter Duration",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Additional Information",
        placeholder: "Enter Additional Information...",
        required: false,
        id: 0,
    },
];
export default function InterpreterService() {
    return (
        ServiceRequests(defaultForm, defaultFormSchema, "/api/interpreter", "")
    );
};
