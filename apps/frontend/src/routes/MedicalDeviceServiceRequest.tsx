import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    employeeName: "",
    location: "",
    priority: "",
    status: "",
    withBalloons: "",
    selectedDevice: "",
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
        options: ["Low", "Medium", "High", "Emergency"],
    },
    {
        content: "select",
        type: "string",
        title: "Status",
        placeholder: "Please Select Status",
        required: true,
        id: 0,
        label: "Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed"],
    },
    {
        content: "checkbox",
        type: "string",
        title: "withBalloons",
        placeholder: "With Balloons?",
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
        options: ["Hospital Bed", "IV Pump", "Recliner"],
    },
];
export default function MedicalDeviceService() {
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/medical-device",
        "",
    );
}
