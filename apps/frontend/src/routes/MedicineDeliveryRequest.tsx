// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import MedicineStore from "@/images/medicinestore.jpg";
// import Tylenol from "@/images/tylenol.jpg";
// import Advil from "@/images/advil.jpg";
// import Melatonin from "@/images/melatonin.jpg";
// import {
//     Carousel,
//     type CarouselApi,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel";

import { ServiceRequests } from "@/components/ServiceRequests";
import medicinestore from "/src/images/medicinestore.jpg";

const defaultFormSchema = {
    patientName: "",
    drugName: "",
    drugQuantity: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    patientCondition: "Fever",
    createdBy: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Drug Delivery Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Patient Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "select",
        type: "string",
        title: "Medicine Type",
        placeholder: "Select Medicine",
        required: true,
        id: 0,
        label: "Options",
        options: ["Tylenol - $5", "Advil - $7", "Melatonin - $10"],
    },
    {
        content: "text",
        type: "number",
        title: "Drug Quantity",
        placeholder: "Enter Drug Quantity",
        required: true,
        id: 0,
    },
    {
        content: "popover",
        type: "string",
        title: "Select Location",
        placeholder: "Select Placeholder 2",
        required: true,
        id: 0,
        label: "",
        options: [],
    },
    {
        content: "radio",
        type: "string",
        title: "Status",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed"],
    },
    {
        content: "radio",
        type: "string",
        title: "Priority",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Priority",
        options: ["Low", "Medium", "High", "Emergency"],
    },
    {
        content: "employee",
        type: "string",
        title: "Assign Employee",
        placeholder: "Select Employee",
        required: false,
        id: 0,
        label: "",
        options: [],
    },
];


    // const [api, setApi] = React.useState<CarouselApi>();
    // const [current, setCurrent] = React.useState(0);
    // const [count, setCount] = React.useState(0);


    // React.useEffect(() => {
    //     if (!api) {
    //         return;
    //     }
    //
    //     setCount(api.scrollSnapList().length);
    //     setCurrent(api.selectedScrollSnap() + 1);
    //
    //     api.on("select", () => {
    //         setCurrent(api.selectedScrollSnap() + 1);
    //     });
    // }, [api]);
export default function DrugDelivery(employee: string | undefined) {
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = employee;
    return (
        ServiceRequests(
            defaultForm,
            defaultFormSchema,
            "/api/medicine",
            medicinestore,
            "Tri and Brendan",
        )
    );
}
