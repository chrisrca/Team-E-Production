import { ServiceRequests } from "@/components/ServiceRequests";
import { giftForm } from "./exampleForms";
import gifts from "/src/images/gifts.jpg";

const defaultFormSchema = {
    recipientName: "",
    giftSize: "",
    message: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    wrapping: "Default - $15",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function GiftServiceRequest() {
    return ServiceRequests(
        giftForm,
        defaultFormSchema,
        "/api/gift",
        gifts,
        "Devin and Marc",
    );
}
