import { ServiceRequests } from "@/components/ServiceRequests";
import Lilacs from "/src/images/Lilacs.png";

const defaultFlowerSchema = {
    patientName: "",
    roomNumber: "",
    priority: "",
    status: "",
    senderName: "",
    cardMessage: "",
    flowerType: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const flowerForm = [
    {
        content: "label",
        title: "Flower Service Request Form",
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
        title: "Sender Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Message",
        placeholder: "Enter Message (Optional)",
        required: true,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Type of Flower",
        placeholder: "Please Select Flower",
        required: false,
        id: 0,
        label: "Status",
        options: ["Roses - $13", "Lilies - $50", "Chrysanthemums - $1000"],
    },
];
export default function FlowerService() {
    return ServiceRequests(
        flowerForm,
        defaultFlowerSchema,
        "/api/flower",
        Lilacs,
    );
}
