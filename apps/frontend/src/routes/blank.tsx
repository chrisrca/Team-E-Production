import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    patientName: "",
    roomNumber: "",
    priority: "",
    status: "",
    drugName: "",
    drugQuantity: "",
    patientCondition: "Fever",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Drug Delivery Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Patient Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "number",
        title: "Room Number",
        placeholder: "Enter Room Number...",
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
        options: ["Low", "Medium", "High", "Emergency",],
    },
    {
        content: "radio",
        type: "string",
        title: "Status",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed",],
    },
    {
        content: "select",
        type: "string",
        title: "Medicine Type",
        placeholder: "Select Medicine",
        required: true,
        id: 0,
        label: "Options",
        options: ["Tylenol - $5", "Advil - $7", "Melatonin - $10"],
    },
    {
        content: "text",
        type: "number",
        title: "Drug Quantity",
        placeholder: "Enter Drug Quantity...",
        required: true,
        id: 0,
    },

];
export default function DrugDelivery() {
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/medicine",
        "",
    );
}
