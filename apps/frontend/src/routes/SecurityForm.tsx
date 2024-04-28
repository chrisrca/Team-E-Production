import { ServiceRequests } from "@/components/ServiceRequests";
import security from "/src/images/security.avif";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function SecurityForm() {
    const { language } = useLanguage(); // Using the useLanguage hook to get the language variable

    const defaultFormSchema = {
        requestType: "",
        alertAuthorities: "false",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
    };

    // Label is necessary, ids are calculated assuming that there is a title

    const securityForm = [
        {
            content: "label",
            title: translate("Security Request", language), // Translating the title
            type: "header",
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: translate("Type", language), // Translating the title
            placeholder: translate("Request Type", language), // Translating the placeholder
            required: true,
            id: 0,
            label: translate("Options", language), // Translating the label
            options: [
                translate("Patient Threat", language), // Translating the option
                translate("Staff Threat", language), // Translating the option
            ],
        },
        {
            content: "checkbox",
            type: "string",
            title: translate("Authorities", language), // Translating the title
            placeholder: translate("Alert Authorities?", language), // Translating the placeholder
            required: false,
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

    return (
        <div>
            {ServiceRequests(
                securityForm,
                defaultFormSchema,
                "/api/security",
                security,
                "Lorenzo and Kai"
            )}
        </div>
    );
}
