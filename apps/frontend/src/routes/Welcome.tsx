import * as React from "react";
import Carousel1 from "/src/images/carousel-1.jpeg";
import Carousel2 from "/src/images/carousel-2.jpeg";
import Flowers from "/src/images/flowers.jpeg";
import Security from "/src/images/security.jpeg";
import Medication from "/src/images/medication.jpeg";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Welcome() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="mx-auto pr-20 pl-20 bg-white shadow rounded-lg">
            {" "}
            {/* component wrapper*/}
            <div className="">
                <h1 className="pt-20 text-4xl font-bold">
                    Bringham and Women's Hospital
                </h1>
                <h2 className="text-xl ">
                    Helping our patients and their families get back to what
                    matters most.
                </h2>
            </div>
            <div className="">
                {" "}
                {/*Hero Carousel*/}
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
                                className="mt-5 rounded-lg"
                                style={{
                                    backgroundImage: `url(${Carousel1})`,
                                    backgroundSize: "cover",
                                    minHeight: "400px",
                                }}
                            >
                                <h1 className="z-1 text-white text-4xl font-bold pt-[300px] pl-8">
                                    Community member?
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            Log-in to your account and view your
                                            services here!
                                        </h2>
                                    </div>
                                    <div className="flex">
                                        <Link
                                            to="/map"
                                            className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1 ml-4"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div
                                className="mt-5 rounded-lg"
                                style={{
                                    backgroundImage: `url(${Carousel2})`,
                                    backgroundSize: "cover",
                                    minHeight: "400px",
                                }}
                            >
                                <h1 className="z-1 text-white text-4xl font-bold pt-[300px] pl-8">
                                    Need Directions?
                                </h1>
                                <div className="flex">
                                    <div className="flex">
                                        <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                            Find your way with our easy-to-use
                                            pathfinder located in the nearest
                                            kiosk!{" "}
                                        </h2>
                                    </div>
                                    <div className="flex">
                                        <Link
                                            to="/map"
                                            className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1 ml-4"
                                        >
                                            Get Started
                                        </Link>
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
                <div>
                    <h1 className="pt-10 text-3xl font-bold">
                        Service Requests
                    </h1>
                    <h2 className="text-xl ">
                        Choose from a selection of services to enrich your stay
                        with us.
                    </h2>
                    <div className="flex">
                        <Card className="w-[350px] mt-5 mr-5 ml-5">
                            {/*card 1*/}
                            <CardHeader>
                                <CardTitle>Flower Request</CardTitle>
                                <CardDescription>
                                    Order some flowers directly to a loved one's
                                    room.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Flowers}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/flower-service"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px] mt-5 mr-5">
                            {/*card 2*/}
                            <CardHeader>
                                <CardTitle>Security Request</CardTitle>
                                <CardDescription>
                                    Feeling threatened? Order security to your
                                    location.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Security}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/security"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1 ml-4"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px] mt-5 mr-5">
                            {/*card 3*/}
                            <CardHeader>
                                <CardTitle>Medicine Request</CardTitle>
                                <CardDescription>
                                    Order your prescribed medications to your
                                    room.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Medication}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/drug-service"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1 ml-4"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex pb-10">
                        <Card className="w-[350px] mt-5 mr-5 ml-5">
                            {/*card 4*/}
                            <CardHeader>
                                <CardTitle>Request</CardTitle>
                                <CardDescription>
                                    Some cool description.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Flowers}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/flower-service"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px] mt-5 mr-5">
                            {" "}
                            {/*card 5*/}
                            <CardHeader>
                                <CardTitle>Request</CardTitle>
                                <CardDescription>
                                    Some cool description.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Flowers}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/flower-service"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px] mt-5 mr-5">
                            {/*card 6*/}
                            <CardHeader>
                                <CardTitle>Request</CardTitle>
                                <CardDescription>
                                    Some cool description.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img src={Flowers}></img>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to="/flower-service"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-indigo-700 align-middle mt-1"
                                >
                                    Take me there
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
