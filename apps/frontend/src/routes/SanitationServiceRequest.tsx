
import { ServiceRequests } from "@/components/ServiceRequests";

const defaultSanitationSchema = {
    patientName: "",
    location: "",
    priority: "",
    status: "",
    additionalInfo: "",
    serviceType: "",
};

//Label is necessary, ids are calculated assuming that there is a title


const sanitationForm = [
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
        title: "Additional Information",
        placeholder: "Enter Additional Information...",
        required: false,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Service Type",
        placeholder: "Please Select Service",
        required: true,
        id: 0,
        label: "Service Type",
        options: ["Biohazard", "Human Waste", "Food", "General", "Other",],
    },
];
export default function SanitationService() {
    return (
        ServiceRequests(sanitationForm, defaultSanitationSchema, "/api/sanitation", "")
    );
};
