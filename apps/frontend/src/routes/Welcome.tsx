import * as React from "react";
import Carousel1 from "/src/images/carousel-1.jpeg";
import Carousel2 from "/src/images/carousel-2.jpeg";
import Carousel3 from "/src/images/carousel-3.jpeg";
import MapImage from "/src/images/BWH-high-res.jpg";
import ServiceImage from "/src/images/hospital-hero.jpg";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FormInput from "@/components/ui/formInput";
import { Link } from "react-router-dom";
import { useAuth0, User } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";

export default function Welcome({setUser}: {setUser: (user: User) => void}){
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [exists, setExists] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayName, setDisplayName] =useState("");
    const [userInfo, setUserInfo] = useState<User | null>(null); // Initialize userInfo to null
    const [showDialog, setShowDialog] = useState(true);
    const { toast } = useToast();

    const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
        useAuth0();
    const handleLogin = () => {
        loginWithRedirect();
    };
    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
        console.log(user);
        if (user) {
            setUserInfo(user); // Set userInfo to user when available
            setUser(user);
        }
    }, [user, setUser]);

    useEffect(() => {
        async function fetchEmployeeData() {
            if (user && user.name && isAuthenticated) {
                try {
                    const encodedName = encodeURIComponent(user.name);
                    const response = await axios.get(
                        `/api/employee/${encodedName}`,
                    );
                    if (response.data && response.data.phone_number) {
                        setUserInfo({ ...user, ...response.data });
                        setExists(true);
                        setShowDialog(false); // Hide dialog if user data is complete
                    } else {
                        setExists(false);
                        setShowDialog(true); // Show dialog if data is incomplete
                    }
                } catch (error) {
                    console.error("Error fetching employee data:", error);
                    setExists(false);
                    setShowDialog(true);
                }
            }
        }
        fetchEmployeeData();
    }, [user, isAuthenticated]);

    const handleUpdateEmployee = async () => {
        if (userInfo && phoneNumber) {
            try {
                const response = await axios.post("/api/employee", {
                    name: userInfo.name,
                    nickname: userInfo.nickname,
                    phone_number: phoneNumber,
                    displayName: displayName,
                });
                if (response.data) {
                    toast({
                        title: "Success",
                        description: response.data,
                    });
                    setUserInfo({ ...userInfo, phone_number: phoneNumber, displayName: displayName });  // Update local state
                    setExists(true); // Assume the employee now exists with a phone number
                    setShowDialog(false); // Hide the dialog after successful update
                    setPhoneNumber(""); // Optionally clear the phoneNumber input
                    setDisplayName("");
                }
            } catch (error) {
                console.error("Failed to update or add employee:", error);
                toast({
                    title: "Error",
                    description: "Failed to update or add employee.",
                });
            }
        }
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
            <div>
                <div className="pr-20 pl-20 bg-background flex flex-col pb-8">
                    {" "}
                    {/* component wrapper*/}
                    <div className="basis-1/2 flex flex-basis flex-col">
                        <h1 className="pt-10 text-4xl font-bold">
                            Brigham and Women's Hospital
                        </h1>
                        <h2 className="text-xl ">
                            Helping our patients and their families get back to
                            what matters most.
                            <br />
                            <br />
                            This website is a term project exercise for WPI CS
                            3733 Software Engineering (Prof. Wong) and is not to
                            be confused with the actual Brigham & Women’s
                            Hospital website.
                        </h2>
                        {!exists && showDialog && (
                            <div className="fixed bottom-4 right-4 bg-background dark:bg-background text-sm text-gray-500 dark:text-gray-400 p-4 rounded-md shadow-md border border-gray-200 dark:border-gray-800 transition-all duration-300">
                                <p>
                                    Looks like there is some information
                                    missing, please verify it to authenticate!
                                </p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">
                                            Verify Info
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Add Additional Info</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Please provide your phone number and DisplayName to complete your profile.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <FormInput
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                        <FormInput
                                            placeholder="Display Name"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                        />
                                        <AlertDialogFooter>
                                            <AlertDialogAction
                                                onClick={handleUpdateEmployee}
                                            >
                                                Submit
                                            </AlertDialogAction>
                                            <AlertDialogCancel
                                                onClick={() =>
                                                    setShowDialog(false)
                                                }
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
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
                                                    easy-to-use pathfinder
                                                    located in the nearest
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
                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                        </Carousel>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            {current} of {count}
                        </div>
                    </div>
                    <div className={""}>
                        <div className={"grid gap-4 grid-cols-2"}>
                            <Card className="bg-secondary shadow-md hover:shadow-lg">
                                {/*card 1*/}
                                <CardHeader>
                                    <CardTitle>Map</CardTitle>
                                    <CardDescription>
                                        Find the path to your destination on our
                                        interactive map.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="">
                                    <img
                                        src={MapImage}
                                        className="rounded-sm w-full overflow-hidden object-cover aspect-[16/9] h-[200px]"
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end items-center">
                                    <Link
                                        to="/map"
                                        className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                                    >
                                        View Map
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="bg-secondary shadow-md hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle>Services</CardTitle>
                                    <CardDescription>
                                        View and request services here.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={ServiceImage}
                                        className="rounded-sm w-full object-cover aspect-[16/9] h-[200px]"
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end items-center">
                                    <Link
                                        to="/services"
                                        className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                                    >
                                        View Services
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    {/* <div>
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
                                    Our apologies! One of our employees is on the case!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div> */}
                </div>
            </div>
        );
    } else {
        return (
            <div className="pr-20 pl-20 bg-background flex flex-col pb-8">
                {" "}
                {/* component wrapper*/}
                <div className="basis-1/2 flex flex-basis flex-col">
                    <h1 className="pt-10 text-4xl font-bold">
                        Brigham and Women's Hospital
                    </h1>
                    <h2 className="text-xl ">
                        Helping our patients and their families get back to what
                        matters most. <br />
                        <br />
                        This website is a term project exercise for WPI CS 3733
                        Software Engineering (Prof. Wong) and is not to be
                        confused with the actual Brigham & Women’s Hospital
                        website.
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
                                                Log-in to your account and view
                                                your services here!
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
                        </CarouselContent>
                        <CarouselPrevious className="" />
                        <CarouselNext className="" />
                    </Carousel>
                    <div className="py-2 text-center text-sm text-muted-foreground">
                        {current} of {count}
                    </div>
                    <div className={"grid gap-4 grid-cols-2"}>
                        <Card className="bg-secondary h-full shadow-md hover:shadow-lg">
                            {/*card 1*/}
                            <CardHeader>
                                <CardTitle>Map</CardTitle>
                                <CardDescription>
                                    Find the path to your destination on our
                                    interactive map.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={MapImage}
                                    className="rounded-sm w-full object-cover object-top aspect-[16/9] h-[200px]"
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end items-center">
                                <Link
                                    to="/map"
                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary"
                                >
                                    View Map
                                </Link>
                            </CardFooter>
                        </Card>
                        <div>
                            <div className="justify-center flex items-center">
                                <div className="bg-secondary z-10 flex items-center justify-center flex-col rounded-sm p-2 absolute">
                                    <div className="text-lg font-bold p-2">
                                        Login to View Services
                                    </div>
                                </div>
                                <Card className="bg-secondary w-full shadow-md hover:shadow-lg blur z-0">
                                    <CardHeader>
                                        <CardTitle>Services</CardTitle>
                                        <CardDescription>
                                            View and request services here.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <img
                                            src={ServiceImage}
                                            className="rounded-sm w-full object-cover object-bottom aspect-[16/9] h-[200px]"
                                        />
                                    </CardContent>
                                    <CardFooter className="flex justify-end items-center">
                                        <Link className="inline-block bg-accent text-white text-md py-2 px-4 rounded">
                                            View Services
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* <div>
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
                    </div> */}
                </div>
            </div>
        );
    }
}


