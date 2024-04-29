import { ServiceRequests } from "@/components/ServiceRequests";
import scheduling from "/src/images/scheduling.jpg";

const defaultFormSchema = {
    serviceType: "",
    startTime: "",
    endTime: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    createdBy: "",
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
export default function RoomScheduling(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(9);
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian",
    );
}
