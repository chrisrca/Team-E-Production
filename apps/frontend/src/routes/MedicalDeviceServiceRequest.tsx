import { ServiceRequests } from "@/components/ServiceRequests";
import MedicalDevice from "/src/images/MedicalDevice.png";

const defaultFormSchema = {
    location: "",
    selectedDevice: "",
    withBalloons: "false",
    status: "",
    priority: "",
    employeeName: "",
    createdBy: "",
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
        content: "checkbox",
        type: "boolean",
        title: "withBalloons",
        placeholder: "With Balloons?",
        required: false,
        id: 0,
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
export default function MedicalDeviceService(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = employee;
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/medical-device",
        MedicalDevice,
        "Brandon Yeu",
    );
}
