import { ServiceRequests } from "@/components/ServiceRequests";
import translation from "/src/images/translation.jpg";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function InterpreterService() {
    const { language } = useLanguage(); // Using the useLanguage hook to get the language variable

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

    // Label is necessary, ids are calculated assuming that there is a title

    const languageForm = [
        {
            content: "label",
            title: translate("Language Interpreter Request", language), // Translating the title
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Client Name", language), // Translating the title
            placeholder: translate("First, Last", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Language", language), // Translating the title
            placeholder: translate("Enter Language", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "popover",
            type: "string",
            title: translate("Select Location", language), // Translating the title
            placeholder: translate("Select Placeholder 2", language), // Translating the placeholder
            required: true,
            id: 0,
            label: "",
            options: [],
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
        {
            content: "text",
            type: "string",
            title: translate("Duration", language), // Translating the title
            placeholder: translate("Enter Duration", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Additional Information", language), // Translating the title
            placeholder: translate("Enter Additional Information... (Optional)", language), // Translating the placeholder
            required: false,
            id: 0,
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
    ];

    return (
        <div>
            {ServiceRequests(
                languageForm,
                defaultFormSchema,
                "/api/interpreter",
                translation,
                "Tao"
            )}
        </div>
    );
}

