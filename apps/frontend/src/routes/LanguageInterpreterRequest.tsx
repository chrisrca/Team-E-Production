import { ServiceRequests } from "@/components/ServiceRequests";
import translation from "/src/images/translation.jpg";

const defaultFormSchema = {
    clientName: "",
    language: "",
    location: "",
    employeeName: "",
    duration: "",
    additionalInfo: "",
    status: "",
    priority: "",
    createdBy: "",

};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Language Interpreter Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Client Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Language",
        placeholder: "Enter Language",
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
        content: "employee",
        type: "string",
        title: "Assign Employee",
        placeholder: "Select Employee",
        required: false,
        id: 0,
        label: "",
        options: [],
    },
    {
        content: "text",
        type: "string",
        title: "Duration",
        placeholder: "Enter Duration",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Additional Information",
        placeholder: "Enter Additional Information... (Optional)",
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
];
export default function InterpreterService(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = employee;
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/interpreter",
        translation,
        "Tao",
    );
}
