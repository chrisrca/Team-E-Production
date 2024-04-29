import { ServiceRequests } from "@/components/ServiceRequests";
import { flowerForm } from "./exampleForms";
import Lilacs from "/src/images/Lilacs.png";

const defaultFlowerSchema = {
    patientName: "",
    flowerType: "",
    senderName: "",
    cardMessage: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function FlowerService() {
    return ServiceRequests(
        flowerForm,
        defaultFlowerSchema,
        "/api/flower",
        Lilacs,
        "Marc, Colin, and Brendan",
    );
}
