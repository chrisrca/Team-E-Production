import { ServiceRequests } from "@/components/ServiceRequests";
import { langForm } from "./exampleForms";
import translation from "/src/images/translation.jpg";

const defaultFormSchema = {
    clientName: "",
    language: "",
    location: "",
    employeeName: "",
    duration: "",
    additionalInfo: "",
    status: "",
    priority: "",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function InterpreterService() {
    return ServiceRequests(
        langForm,
        defaultFormSchema,
        "/api/interpreter",
        translation,
        "Tao",
    );
}
