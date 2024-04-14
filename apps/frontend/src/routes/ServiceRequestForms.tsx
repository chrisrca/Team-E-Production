import { ServiceRequests } from "@/components/ServiceRequests";

// interface TestSchema {
//     patientName: string;
//     roomNumber: string;
//     patientCondition: string;
// }

const defaultTestSchema = {
    textBox1: "",
    select1: "",
    textBox2: "",
    select2: "",
    radio1: "",
    checkbox: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const test = [
    {
        content: "label",
        title: "Big Ass Label",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Textbox 1",
        placeholder: "Text Placeholder 1",
        required: true,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Select 1",
        placeholder: "Select Placeholder 1",
        required: true,
        id: 0,
        label: "Options",
        options: ["Option 1", "Option 2", "Option 3"],
    },
    {
        content: "select",
        type: "string",
        title: "Select 2",
        placeholder: "Select Placeholder 2",
        required: false,
        id: 0,
        label: "Options",
        options: ["Option 1", "Option 2", "Option 3"],
    },
    {
        content: "text",
        type: "number",
        title: "Textbox 2",
        placeholder: "Text Placeholder 2",
        required: true,
        id: 0,
    },
    {
        content: "radio",
        type: "string",
        title: "Radio 1",
        placeholder: "Radio Placeholder 1",
        required: false,
        id: 0,
        label: "Radio Buttons",
        options: ["Radio 1", "Radio 2", "Radio 3"],
    },
    {
        content: "checkbox",
        type: "string",
        title: "Checkbox 1",
        placeholder: "Checkbox?",
        required: false,
        id: 0,
    },
    {
        content: "popover",
        type: "string",
        title: "Select 2",
        placeholder: "Select Placeholder 2",
        required: false,
        id: 0,
        label: "Options",
        options: ["Option 1", "Option 2", "Option 3"],
    },
];
export const ServiceRequestForm = () => {
    return ServiceRequests(test, defaultTestSchema, "");
};
