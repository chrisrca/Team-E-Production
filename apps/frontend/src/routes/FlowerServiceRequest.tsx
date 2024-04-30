import { ServiceRequests } from "@/components/ServiceRequests";
import { flowerForm } from "./exampleForms";
import Lilacs from "/src/images/Lilacs.png";

const defaultFormSchema = {
    patientName: "",
    flowerType: "",
    senderName: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    cardMessage: "",
    createdBy: "",
};

export default function FlowerService() {
    return ServiceRequests(
        flowerForm,
        defaultFormSchema,
        "/api/flower",
        Lilacs,
        "Marc, Colin, and Brendan"
    );
};

