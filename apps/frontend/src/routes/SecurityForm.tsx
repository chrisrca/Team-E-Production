import { ServiceRequests } from "@/components/ServiceRequests";
import security from "/src/images/security.avif";

const defaultFormSchema = {
    requestType: "",
    alertAuthorities: "false",
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
        title: "Security Request",
        type: "header",
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Type",
        placeholder: "Request Type",
        required: true,
        id: 0,
        label: "Options",
        options: ["Patient Threat", "Staff Threat"],
    },
    {
        content: "checkbox",
        type: "string",
        title: "Authorities",
        placeholder: "Alert Authorities?",
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
export default function SecurityForm(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee);
    return ServiceRequests(
        defaultForm,
        defaultFormSchema,
        "/api/security",
        security,
        "Lorenzo and Kai",
    );
}
