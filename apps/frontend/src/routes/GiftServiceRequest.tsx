import { ServiceRequests } from "@/components/ServiceRequests";
import gifts from "/src/images/gifts.jpg";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

const defaultFormSchema = {
    recipientName: "",
    giftSize: "",
    message: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    wrapping: "",
    createdBy: "",
};

export default function GiftServiceRequest() {
    const { language } = useLanguage(); // Using the useLanguage hook to get the language variable
    defaultFormSchema.wrapping = translate("Default - $15", language); // Translating the wrapping value
    const giftForm = [
        {
            content: "label",
            title: translate("Gift Delivery Request", language), // Translating the title
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Recipient Name", language), // Translating the title
            placeholder: translate("First, Last", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: translate("Gift Size", language), // Translating the title
            placeholder: translate("Select Size", language), // Translating the placeholder
            required: true,
            id: 0,
            label: translate("Options", language), // Translating the label
            options: [
                translate("Small", language), // Translating the option
                translate("Medium", language), // Translating the option
                translate("Large", language), // Translating the option
            ],
        },
        {
            content: "text",
            type: "string",
            title: translate("Message", language), // Translating the title
            placeholder: translate("Enter a Message... (Optional)", language), // Translating the placeholder
            required: false,
            id: 0,
        },
        {
            content: "popover",
            type: "string",
            title: translate("Select Location", language), // Translating the title
            placeholder: translate("Select Location", language),
            required: true,
            id: 0,
            label: "",
            options: [],
        },
        {
            content: "radio",
            type: "string",
            title: translate("Status", language), // Translating the title
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Status", language), // Translating the label
            options: [
                translate("Unassigned", language), // Translating the option
                translate("Assigned", language), // Translating the option
                translate("In Progress", language), // Translating the option
                translate("Closed", language), // Translating the option
            ],
        },
        {
            content: "radio",
            type: "string",
            title: translate("Priority", language), // Translating the title
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Priority", language), // Translating the label
            options: [
                translate("Low", language), // Translating the option
                translate("Medium", language), // Translating the option
                translate("High", language), // Translating the option
                translate("Emergency", language), // Translating the option
            ],
        },
        {
            content: "employee",
            type: "string",
            title: translate("Assign Employee", language), // Translating the title
            placeholder: translate("Select Employee", language), // Translating the placeholder
            required: false,
            id: 0,
            label: "",
            options: [],
        },
    ];

    return ServiceRequests(
        giftForm,
        defaultFormSchema,
        "/api/gift",
        gifts,
        "Devin and Marc",
    );
}
