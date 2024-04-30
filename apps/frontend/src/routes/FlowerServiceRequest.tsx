import { ServiceRequests } from "@/components/ServiceRequests";
import Lilacs from "/src/images/Lilacs.png";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

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

// Label is necessary, ids are calculated assuming that there is a title

export default function FlowerService (employee: string | undefined) {
    const { language } = useLanguage(); // Using the useLanguage hook here

        const flowerForm = [
        {
            content: "label",
            title: translate("Flower Service Request Form", language), // Using translate function for localization
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Patient Name", language),
            placeholder: translate("First, Last", language),
            required: true,
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: translate("Type of Flower", language),
            placeholder: translate("Please Select Flower", language),
            required: true,
            id: 0,
            label: "Status",
            options: [translate("Roses - $13", language), translate("Lilies - $50", language), translate("Chrysanthemums - $1000", language)],
        },
        {
            content: "text",
            type: "string",
            title: translate("Sender Name", language),
            placeholder: translate("First, Last", language),
            required: true,
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Message", language),
            placeholder: translate("Enter Message (Optional)", language),
            required: false,
            id: 0,
        },
        {
            content: "popover",
            type: "string",
            title: translate("Select Location", language),
            placeholder: translate("Select Location", language),
            required: true,
            id: 0,
            label: "",
            options: [],
        },
        {
            content: "radio",
            type: "string",
            title: translate("Status", language),
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Status", language),
            options: [translate("Unassigned", language), translate("Assigned", language), translate("In Progress", language), translate("Closed", language)],
        },
        {
            content: "radio",
            type: "string",
            title: translate("Priority", language),
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Priority", language),
            options: [translate("Low", language), translate("Medium", language), translate("High", language), translate("Emergency", language)],
        },
        {
            content: "employee",
            type: "string",
            title: translate("Assign Employee", language),
            placeholder: translate("Select Employee", language),
            required: false,
            id: 0,
            label: "",
            options: [],
        },
    ];
        if(employee == undefined){
            return;
        }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(9);
    return ServiceRequests(
        flowerForm,
        defaultFormSchema,
        "/api/flower",
        Lilacs,
        "Marc, Colin, and Brendan"
    );
};

