import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import Flowers from "/src/images/flowers.jpeg";
import Security from "/src/images/security.jpeg";
import Medication from "/src/images/medication.jpeg";
import Gift from "/src/images/gift.png";
import Language from "/src/images/Language.webp";
import Sanitation from "/src/images/Sanitation.png";
import Scheduling from "/src/images/scheduling.jpg";
import Device from "/src/images/MedicalDevice.png";


export default function Services() {
    return (
        <div className={"px-10"}>
            <div className={"px-16 py-8 rounded-xl"}>
                <h1 className="text-3xl font-bold">Service Requests</h1>
                <h2 className="text-xl pb-4">
                    Choose from a selection of services to enrich your stay with
                    us.
                </h2>
                <div className="grid lg:grid-cols-4 gap-5">
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 1*/}
                        <CardHeader>
                            <CardTitle>Flower Request</CardTitle>
                            <CardDescription>
                                Order some flowers directly to a loved one's
                                room.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Flowers}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/flower-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary"
                            >
                                Order
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 2*/}
                        <CardHeader>
                            <CardTitle>Security Request</CardTitle>
                            <CardDescription>
                                Feeling threatened? Order security to your
                                location.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Security}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/security"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                            >
                                Request
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 3*/}
                        <CardHeader>
                            <CardTitle>Medicine Request</CardTitle>
                            <CardDescription>
                                Order your prescribed medications to your room.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Medication}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/drug-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                            >
                                Order
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 3*/}
                        <CardHeader>
                            <CardTitle>Diagnosis Bot</CardTitle>
                            <CardDescription>
                                Talk to a Bot to help with your diagnosis!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Medication}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/diagnosis-bot-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                            >
                                Order
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 4*/}
                        <CardHeader>
                            <CardTitle>Gift Request</CardTitle>
                            <CardDescription>
                                Get your friend a gift, you can even have it
                                wrapped!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Gift}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/gift-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1"
                            >
                                Order
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {" "}
                        {/*card 5*/}
                        <CardHeader>
                            <CardTitle>Interpreter Request</CardTitle>
                            <CardDescription>
                                Interpretation Language Needs Bonjour
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Language}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/language-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1"
                            >
                                Request
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 6*/}
                        <CardHeader>
                            <CardTitle>Sanitation Request</CardTitle>
                            <CardDescription>
                                For all your cleaning needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Sanitation}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/sanitation"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1"
                            >
                                Request
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 7*/}
                        <CardHeader>
                            <CardTitle>Room Scheduling</CardTitle>
                            <CardDescription>
                                Schedule a room for your needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Scheduling}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/room-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1"
                            >
                                Take me there
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg">
                        {/*card 8*/}
                        <CardHeader>
                            <CardTitle>Medical Device Request</CardTitle>
                            <CardDescription>
                                Request a device for your patient
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Device}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/medical-device-service"
                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1"
                            >
                                Request
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
