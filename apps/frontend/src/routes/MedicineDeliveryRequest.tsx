import { ServiceRequests } from "@/components/ServiceRequests";
import medicinestore from "/src/images/medicinestore.jpg";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function DrugDelivery() {
    const { language } = useLanguage(); // Using the useLanguage hook to get the language variable

    const defaultFormSchema = {
        patientName: "",
        drugName: "",
        drugQuantity: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
        patientCondition: translate("Fever", language), // Translating the patient condition
        createdBy: "",
    };

    // Label is necessary, ids are calculated assuming that there is a title

    const drugForm = [
        {
            content: "label",
            title: translate("Drug Delivery Request", language), // Translating the title
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Patient Name", language), // Translating the title
            placeholder: translate("First, Last", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: translate("Medicine Type", language), // Translating the title
            placeholder: translate("Select Medicine", language), // Translating the placeholder
            required: true,
            id: 0,
            label: translate("Options", language), // Translating the label
            options: [
                translate("Tylenol - $5", language), // Translating the option
                translate("Advil - $7", language), // Translating the option
                translate("Melatonin - $10", language), // Translating the option
            ],
        },
        {
            content: "text",
            type: "number",
            title: translate("Drug Quantity", language), // Translating the title
            placeholder: translate("Enter Drug Quantity", language), // Translating the placeholder
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
                drugForm,
                defaultFormSchema,
                "/api/medicine",
                medicinestore,
                "Tri and Brendan"
            )}
        </div>
    );
}

