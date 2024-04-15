import { ServiceRequests } from "@/components/ServiceRequests";
import Language from "/src/images/LanguageInterpreter.png";

const defaultFormSchema = {
    patientName: "",
    location: "",
    priority: "",
    status: "",
    serviceType: "",
    additionalInfo: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Sanitation Service Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Employee Name",
        placeholder: "First, Last",
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
        content: "radio",
        type: "string",
        title: "Priority",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Priority",
        options: ["Low", "Medium", "High", "Emergency"],
    },
    {
        content: "radio",
        type: "string",
        title: "Status",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed"],
    },
    {
        content: "select",
        type: "string",
        title: "Service Type",
        placeholder: "Please Select Service",
        required: true,
        id: 0,
        label: "Service Type",
        options: ["Biohazard", "Human Waste", "Food", "General", "Other"],
    },
    {
        content: "text",
        type: "string",
        title: "Additional Information",
        placeholder: "Enter Additional Information...",
        required: false,
        id: 0,
        variant: "large",
    },
];
export default function SanitationService() {
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/sanitation",
        Language,
    );
}
