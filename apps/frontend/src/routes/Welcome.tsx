import * as React from "react";
import Carousel1 from "/src/images/carousel-1.jpeg";
import Carousel2 from "/src/images/carousel-2.jpeg";
import Carousel3 from "/src/images/carousel-3.jpeg";
import Flowers from "/src/images/flowers.jpeg";
import Security from "/src/images/security.jpeg";
import Medication from "/src/images/medication.jpeg";
import Gift from "/src/images/gift.png";
import Language from "/src/images/Language.webp";
import Sanitation from "/src/images/Sanitation.png";
import Scheduling from "/src/images/scheduling.jpg";
import Device from "/src/images/MedicalDevice.png";
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
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Welcome() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const {loginWithRedirect, logout, isAuthenticated, isLoading} =
        useAuth0();
    const handleLogin = () => {
        loginWithRedirect();
    };
    const handleLogout = () => {
        logout();
    };

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return (
            <div className="mx-auto pr-20 pl-20 bg-background shadow rounded-lg pb-8">
                {" "}
                {/* component wrapper*/}
                <div className="">
                    <h1 className="pt-20 text-4xl font-bold">
                        Brigham and Women's Hospital
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
                                        backgroundImage: `url(${Carousel3})`,
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
                                                Heading out? Log-out of your
                                                account here!
                                            </h2>
                                        </div>
                                        <div className="flex">
                                            <Button
                                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded bg-destructive hover:bg-primary align-middle mt-1 ml-4"
                                                onClick={handleLogout}
                                            >
                                                Log-out
                                            </Button>
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
                                                Find your way with our
                                                easy-to-use pathfinder located
                                                in the nearest kiosk!{" "}
                                            </h2>
                                        </div>
                                        <div className="flex">
                                            <Link
                                                to="/map"
                                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className=""/>
                        <CarouselNext className=""/>
                    </Carousel>
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        {current} of {count}
                    </div>
                    <div className={"px-10"}>
                        <div
                            className={
                                "px-16 py-8 rounded-xl"
                            }
                        >
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
                                            Order your prescribed medications directly to your room.
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
                        <div>
                            <h1 className="text-3xl font-bold">
                                Frequently Asked Questions
                            </h1>
                            <h2 className="pt-4 text-xl ">
                                Answers to some of our visitor's most common
                                questions.
                            </h2>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        Where can I find my room?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Go to the{" "}
                                        <Link className="hover:underline" to="/map">
                                            Map
                                        </Link>{" "}
                                        and navigate from there.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        Why is my service request taking so long?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Our apologies! Wongman is on the case!
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {


        return (
            <div className="mx-auto pr-20 pl-20 bg-background shadow rounded-lg">
                {" "}
                {/* component wrapper*/}
                <div className="">
                    <h1 className="pt-20 text-4xl font-bold">
                        Brigham and Women's Hospital
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
                                            <Button
                                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                                                onClick={handleLogin}
                                            >
                                                Log-in
                                            </Button>
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
                                            <h2 className="z-1 text-white text-2xl pt-2 pl-8 contrast-200">
                                                Find your way with our easy-to-use
                                                pathfinder located in the nearest
                                                kiosk!{" "}
                                            </h2>
                                        </div>
                                        <div className="flex">
                                            <Link
                                                to="/map"
                                                className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className=""/>
                        <CarouselNext className=""/>
                    </Carousel>
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        {current} of {count}
                    </div>
                    <h1 className="pt-10 text-3xl font-bold">
                        Service Requests
                    </h1>
                    <h2 className="text-xl ">
                        Log-in to view our selection of services.
                    </h2>
                    <div className="grid lg:grid-cols-4 gap-5 pt-5 pb-16">
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] bg-primary rounded-xl"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[250px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                                <Skeleton className="h-4 w-[200px] bg-primary"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Frequently Asked Questions
                        </h1>
                        <h2 className="pt-4 text-xl ">
                            Answers to some of our visitor's most common
                            questions.
                        </h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Why can't I see any service requests?
                                </AccordionTrigger>
                                <AccordionContent>
                                    <span
                                        className="hover:underline hover:cursor-pointer"
                                        onClick={handleLogin}
                                    >
                                        Log-in
                                    </span>{" "}
                                    to your account to access our services.
                                    there.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Where can I find my room?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Go to the{" "}
                                    <Link className="hover:underline" to="/map">
                                        Map
                                    </Link>{" "}
                                    and navigate from there.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        );
    }
}


