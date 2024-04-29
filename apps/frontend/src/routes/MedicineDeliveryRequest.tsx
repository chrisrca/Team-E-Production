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
import { medForm } from "./exampleForms";
import medicinestore from "/src/images/medicinestore.jpg";
export default function DrugDelivery() {
    // const [api, setApi] = React.useState<CarouselApi>();
    // const [current, setCurrent] = React.useState(0);
    // const [count, setCount] = React.useState(0);
    const defaultFormSchema = {
        patientName: "",
        drugName: "",
        drugQuantity: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
        patientCondition: "Fever",
    };

    //Label is necessary, ids are calculated assuming that there is a title

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

    return (
        <div>
            {/*<div className="relative z-50 mx-auto w-3/4">
                <div className="">
                    <Carousel
                        className=""
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 10000,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            <CarouselItem>
                                <div
                                    className="mt-3 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${MedicineStore})`,
                                        backgroundSize: "cover",
                                        minHeight: "300px",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                        Request medication here!
                                    </h1>
                                    <div className="flex">
                                        <div className="flex">
                                            <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                Order medicine to be safely
                                                delivered to your destination!
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className="mt-3 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${Tylenol})`,
                                        backgroundSize: "cover",
                                        minHeight: "300px",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                        Tylenol
                                    </h1>
                                    <div className="flex">
                                        <div className="flex">
                                            <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                For those suffering with fevers
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className="mt-3 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${Advil})`,
                                        backgroundSize: "cover",
                                        minHeight: "300px",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                        Advil
                                    </h1>
                                    <div className="flex">
                                        <div className="flex">
                                            <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                To help with body sores
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className="mt-3 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${Melatonin})`,
                                        backgroundSize: "cover",
                                        minHeight: "300px",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <h1 className="z-1 text-white text-3xl font-bold pt-[250px] pl-8">
                                        Melatonin
                                    </h1>
                                    <div className="flex">
                                        <div className="flex">
                                            <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                For those suffering with insomnia
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="" />
                        <CarouselNext className="" />
                    </Carousel>
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        {current} of {count}
                    </div>
                </div>
            </div>*/}
            {ServiceRequests(
                medForm,
                defaultFormSchema,
                "/api/medicine",
                medicinestore,
                "Tri and Brendan",
            )}
        </div>
    );
}
