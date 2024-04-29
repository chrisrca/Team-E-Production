import { ServiceRequests } from "@/components/ServiceRequests";
import { roomForm } from "./exampleForms";
import scheduling from "/src/images/scheduling.jpg";

const defaultFormSchema = {
    serviceType: "",
    startTime: "",
    endTime: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function RoomScheduling() {
    return ServiceRequests(
        roomForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian",
    );
}
