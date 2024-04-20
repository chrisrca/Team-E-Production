import { ServiceRequests } from "@/components/ServiceRequests";
import scheduling from "/src/images/scheduling.jpg";

const defaultFormSchema = {
    employeeName: "",
    serviceType: "",
    startTime: "",
    endTime: "",
    location: "",
    status: "",
    priority: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Room Scheduling Request",
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
        options: ["Maintenance", "It Support", "Cleaning", "Security"],
    },
    {
        content: "text",
        type: "datetime-local",
        title: "Start Time",
        placeholder: "",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "datetime-local",
        title: "End Time",
        placeholder: "",
        required: true,
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
];
export default function RoomScheduling() {
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian",
    );
}
