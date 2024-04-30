import { ServiceRequests } from "@/components/ServiceRequests";
import { secForm } from "./exampleForms";
import security from "/src/images/security.avif";

const defaultFormSchema = {
    requestType: "",
    employeeName: "",
    location: "",
    status: "",
    priority: "",
    alertAuthorities: "false",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function SecurityForm() {
    return ServiceRequests(
        secForm,
        defaultFormSchema,
        "/api/security",
        security,
        "Lorenzo and Kai",
    );
}
