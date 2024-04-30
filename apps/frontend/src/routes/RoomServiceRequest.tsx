import { ServiceRequests } from "@/components/ServiceRequests";
import scheduling from "/src/images/scheduling.jpg";
import { roomForm } from "./exampleForms";

export default function RoomScheduling(employee: string | undefined) {

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

    // Label is necessary, ids are calculated assuming that there is a title

    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(9);
  
    return ServiceRequests(
        roomForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian"
    );
}
