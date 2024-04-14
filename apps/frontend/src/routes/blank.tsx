import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    recipientName: "",
    deliveryLocation: "",
    priority: "",
    status: "",
    message: "",
    giftSize: "",
    wrapping: "Default - $15",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Gift Delivery Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Recipient Name",
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
        content: "text",
        type: "string",
        title: "Message",
        placeholder: "Enter a Message... (Optional)",
        required: true,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Gift Size",
        placeholder: "Select Size",
        required: true,
        id: 0,
        label: "Options",
        options: ["Small", "Medium", "Large"],
    },
];
export default function GiftServiceRequest() {
    return ServiceRequests(defaultForm, defaultFormSchema, "/api/gift", "");
}
