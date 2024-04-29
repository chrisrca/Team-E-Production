import { ServiceRequests } from "@/components/ServiceRequests";
import Lilacs from "/src/images/Lilacs.png";

const defaultFormSchema = {
    patientName: "",
    flowerType: "",
    senderName: "",
    cardMessage: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    createdBy: "",
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
        content: "select",
        type: "string",
        title: "Type of Flower",
        placeholder: "Please Select Flower",
        required: true,
        id: 0,
        label: "Status",
        options: ["Roses - $13", "Lilies - $50", "Chrysanthemums - $1000"],
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
        required: false,
        id: 0,
    },
    {
        content: "popover",
        type: "string",
        title: "Select Location",
        placeholder: "Select Placeholder 2",
        required: true,
        id: 0,
        label: "",
        options: [],
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
        content: "employee",
        type: "string",
        title: "Assign Employee",
        placeholder: "Select Employee",
        required: false,
        id: 0,
        label: "",
        options: [],
    },
];
export default function FlowerService(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = employee;
    return ServiceRequests(
        flowerForm,
        defaultFormSchema,
        "/api/flower",
        Lilacs,
        "Marc, Colin, and Brendan",
    );
}
