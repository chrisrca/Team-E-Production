import { ServiceRequests } from "@/components/ServiceRequests";
import MedicalDevice from "/src/images/MedicalDevice.png";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function MedicalDeviceService() {
    const { language } = useLanguage();

    const defaultFormSchema = {
        location: "",
        selectedDevice: "",
        withBalloons: "false",
        status: "",
        priority: "",
        employeeName: "",
        createdBy: "",
    };

    const deviceForm = [
        {
            content: "label",
            title: translate("Medical Device Request", language),
            type: "header",
            id: 0,
        },
        {
            content: "popover",
            type: "string",
            title: translate("Select Location", language),
            placeholder: translate("Select Placeholder 2", language),
            required: true,
            id: 0,
            label: "",
            options: [],
        },
        {
            content: "select",
            type: "string",
            title: translate("Service Type", language),
            placeholder: translate("Please Select Service", language),
            required: true,
            id: 0,
            label: translate("Service Type", language),
            options: [
                translate("Hospital Bed", language),
                translate("IV Pump", language),
                translate("Recliner", language),
            ],
        },
        {
            content: "checkbox",
            type: "boolean",
            title: translate("With Balloons?", language),
            placeholder: translate("With Balloons?", language),
            required: false,
            id: 0,
        },
        {
            content: "radio",
            type: "string",
            title: translate("Status", language),
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Status", language),
            options: [
                translate("Unassigned", language),
                translate("Assigned", language),
                translate("In Progress", language),
                translate("Closed", language),
            ],
        },
        {
            content: "radio",
            type: "string",
            title: translate("Priority", language),
            placeholder: "",
            required: true,
            id: 0,
            label: translate("Request Priority", language),
            options: [
                translate("Low", language),
                translate("Medium", language),
                translate("High", language),
                translate("Emergency", language),
            ],
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

    return ServiceRequests(
        deviceForm,
        defaultFormSchema,
        "/api/medical-device",
        MedicalDevice,
        "Brandon Yeu",
    );
}
