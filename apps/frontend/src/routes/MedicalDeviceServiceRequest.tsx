import { ServiceRequests } from "@/components/ServiceRequests";
import MedicalDevice from "/src/images/MedicalDevice.png";

const defaultFormSchema = {
    employeeName: "",
    selectedDevice: "",
    location: "",
    priority: "",
    status: "",
    withBalloons: "false",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Medical Device Request",
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
        content: "select",
        type: "string",
        title: "Service Type",
        placeholder: "Please Select Service",
        required: true,
        id: 0,
        label: "Service Type",
        options: ["Hospital Bed", "IV Pump", "Recliner"],
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
        content: "checkbox",
        type: "boolean",
        title: "withBalloons",
        placeholder: "With Balloons?",
        required: false,
        id: 0,
    },
];
export default function MedicalDeviceService() {
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/medical-device",
        MedicalDevice,
        "Brandon Yeu"
    );
}
