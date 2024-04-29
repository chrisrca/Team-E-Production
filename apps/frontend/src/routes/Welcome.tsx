import * as React from "react";
import Carousel2 from "/src/images/carousel-2.jpeg";
import Carousel3 from "/src/images/carousel-3.jpeg";
import MapImage from "/src/images/BWH-high-res.jpg";
//import bgImage from "/src/images/brighamandwomensbuildingimage.jpeg";
//import { MapPinned, CircleUserRound } from "lucide-react";
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
import {  useEffect, useState  } from "react";
import {  useToast  } from "@/components/ui/use-toast.ts";
import {translate, useLanguage} from "@/components/LanguageProvider.tsx";
//import MapWindow from "@/components/MapWindow.tsx";
import { DBNode } from "common/src/types";
import {ProjectWarning} from "@/components/ui/projectWarning.tsx";
export default function Welcome({ setUser }: { nodes: DBNode[], setUser: (user: User) => void}){
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [exists, setExists] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayName, setDisplayName] =useState("");
    const [userInfo, setUserInfo] = useState<User | null>(null); // Initialize userInfo to null
    const [showDialog, setShowDialog] = useState(true);
    const { toast } = useToast();
    const { language } = useLanguage();

    const { logout, isAuthenticated, isLoading, user } =
        useAuth0();
    // const handleLogin = () => {
    //     loginWithRedirect();
    // };
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
                            {translate("Brigham and Women's Hospital", language)}
                        </h1>
                        <h2 className="text-xl ">
                            {translate("Helping our patients and their families get back to what matters most.", language)}
                            <br/><br/>
                            {translate("This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website.", language)}
                        </h2>
                        {!exists && showDialog && (
                            <div className="fixed bottom-4 right-4 bg-background dark:bg-background text-sm text-gray-500 dark:text-gray-400 p-4 rounded-md shadow-md border border-gray-200 dark:border-gray-800 transition-all duration-300">
                                <p>{translate("Looks like there is some information missing, please verify it to authenticate!", language)}</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline">{translate("Verify Info", language)}</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>{translate("Add Phone Number", language)}</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {translate("Please provide your phone number to complete your profile.", language)}
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
                                            {translate("Community member?", language)}
                                        </h1>
                                        <div className="flex">
                                            <div className="flex">
                                                <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                    {translate("Heading out? Log-out of your account here!", language)}
                                                </h2>
                                            </div>
                                            <div className="flex">
                                                <Button
                                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded bg-destructive hover:bg-primary align-middle mt-1 ml-4"
                                                    onClick={handleLogout}
                                                >
                                                    {translate("Log-out", language)}
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
                                            {translate("Need Directions?", language)}
                                        </h1>
                                        <div className="flex">
                                            <div className="flex">
                                                <h2 className="z-1 text-white text-2xl pt-2 pl-8">
                                                    {translate("Find your way with our easy-to-use pathfinder located in the nearest kiosk!", language)} {" "}
                                                </h2>
                                            </div>
                                            <div className="flex">
                                                <Link
                                                    to="/map"
                                                    className="inline-block bg-accent text-white text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4"
                                                >
                                                    {translate("Get Started", language)}
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
                                    <CardTitle>{translate("Map", language)}</CardTitle>
                                    <CardDescription>
                                        {translate("Find the path to your destination on our interactive map.", language)}
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
                                        {translate("View Map", language)}
                                    </Link>
                                </CardFooter>
                            </Card>
                            <Card className="bg-secondary shadow-md hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle>{translate("Services", language)}</CardTitle>
                                    <CardDescription>
                                        {translate("View and request services here.", language)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={ServiceImage}
                                        className="rounded-sm w-full object-cover aspect-[16/9] h-[200px]"
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end items-center">
                                    <Link to="/services"
                                          className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary">
                                        {translate("View Services", language)}
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <ProjectWarning />
            </div>
            // <MapWindow nodes={nodes} />
            // <div
            //     className="absolute bg-gradient-to-l from-30% from-kiosk"
            //     style={{
            //         width: "100vw",
            //         height: "100vh",
            //         display: "flex",
            //         alignItems: "center",
            //         justifyContent: "center",
            //         overflow: "hidden",
            //     }}
            // >
            //     <div
            //         className="absolute"
            //         style={{
            //             backgroundImage: `url(${bgImage})`,
            //             backgroundSize: "cover",
            //             backgroundPosition: "center",
            //             width: "100vw",
            //             height: "100vh",
            //             zIndex: -1,
            //         }}
            //     ></div>
            //       <div className="top-0 w-screen items-center align-center text-center absolute bg-accent text-sm">
            //         This website is a term project exercise for CS 3733 Software Engineering (Prof. Wong) <br/> and is not to be confused with the actual Brigham and Women's Hospital website.
            //     </div>
            //     <MapPinned/>
            //     <CircleUserRound/>
            // </div>
        );
    }
}


