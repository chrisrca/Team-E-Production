import { ServiceRequests } from "@/components/ServiceRequests";
import { medicalForm } from "./exampleForms";
import MedicalDevice from "/src/images/MedicalDevice.png";

const defaultFormSchema = {
    location: "",
    selectedDevice: "",
    withBalloons: "false",
    status: "",
    priority: "",
    employeeName: "",
};

//Label is necessary, ids are calculated assuming that there is a title

export default function MedicalDeviceService() {
    return ServiceRequests(
        medicalForm,
        defaultFormSchema,
        "/api/medical-device",
        MedicalDevice,
        "Brandon Yeu",
    );
}
