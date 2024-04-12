
import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    employeeName: "",
    location: "",
    priority: "",
    status: "",
    startTime: "",
    endTime: "",
    serviceType: "",
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
        content: "select",
        type: "string",
        title: "Service Type",
        placeholder: "Please Select Service",
        required: true,
        id: 0,
        label: "Service Type",
        options: ["Maintenance", "It Support", "Cleaning", "Security",],
    },
];
export default function RoomScheduling() {
    return (
        ServiceRequests(defaultForm, defaultFormSchema, "/api/room", "")
    );
};
