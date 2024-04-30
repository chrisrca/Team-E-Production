import { ServiceRequests } from "@/components/ServiceRequests";
import cleaning from "/src/images/cleaning.jpg";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function SanitationService(employee: string | undefined) {
    const { language } = useLanguage(); // Using the useLanguage hook to get the language variable

    const defaultFormSchema = {
        patientName: "",
        serviceType: "",
        additionalInfo: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
        createdBy: "",
    };

    
    // Label is necessary, ids are calculated assuming that there is a title

    const sanitationForm = [
        {
            content: "label",
            title: translate("Sanitation Service Request", language), // Translating the title
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Employee Name", language), // Translating the title
            placeholder: translate("First, Last", language), // Translating the placeholder
            required: true,
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: translate("Service Type", language), // Translating the title
            placeholder: translate("Please Select Service", language), // Translating the placeholder
            required: true,
            id: 0,
            label: translate("Service Type", language), // Translating the label
            options: [
                translate("Biohazard", language), // Translating the option
                translate("Human Waste", language), // Translating the option
                translate("Food", language), // Translating the option
                translate("General", language), // Translating the option
                translate("Other", language), // Translating the option
            ],
        },
        {
            content: "text",
            type: "string",
            title: translate("Additional Information", language), // Translating the title
            placeholder: translate("Enter Additional Information...", language), // Translating the placeholder
            required: false,
            id: 0,
            variant: "large",
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
    
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(9);  
  
    return (
        <div>
            {ServiceRequests(
                sanitationForm,
                defaultFormSchema,
                "/api/sanitation",
                cleaning,
                "Yan"
            )}
        </div>
    );
}
