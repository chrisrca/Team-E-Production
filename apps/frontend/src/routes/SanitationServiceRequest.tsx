import { ServiceRequests } from "@/components/ServiceRequests";
import { sanitationForm } from "./exampleForms";
import cleaning from "/src/images/cleaning.jpg";

const defaultFormSchema = {
    patientName: "",
    serviceType: "",
    additionalInfo: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function SanitationService() {
    return ServiceRequests(
        sanitationForm,
        defaultFormSchema,
        "/api/sanitation",
        cleaning,
        "Yan",
    );
}
