import { ServiceRequests } from "@/components/ServiceRequests";
import scheduling from "/src/images/scheduling.jpg";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function RoomScheduling(employee: string | undefined) {
    const { language } = useLanguage();

    const defaultFormSchema = {
        serviceType: "",
        startTime: "",
        endTime: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
        createdBy: "",
    };

    const serviceForm = [
        {
            content: "label",
            title: translate("Room Scheduling Request", language),
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: translate("Employee Name", language),
            placeholder: translate("First, Last", language),
            required: true,
            id: 0,
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
                translate("Maintenance", language),
                translate("It Support", language),
                translate("Cleaning", language),
                translate("Security", language),
            ],
        },
        {
            content: "text",
            type: "datetime-local",
            title: translate("Start Time", language),
            placeholder: "",
            required: true,
            id: 0,
        },
        {
            content: "text",
            type: "datetime-local",
            title: translate("End Time", language),
            placeholder: "",
            required: true,
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

    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(9);
  
    return ServiceRequests(
        serviceForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian"
    );
}
