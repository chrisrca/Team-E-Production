"use client";
import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import bwhLogo from "../images/BWH logo.svg";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hamburger() {
    const { isAuthenticated } = useAuth0();

    return (
        <Sheet>
            <SheetTrigger className="fixed top-0 z-50 pl-2 pt-2 flex ">
                <Button variant={"outline"} size={"icon"}>
                    <Menu className={"transition-all"} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="dark:bg-secondary">
                <div className="grid gap-2 py-4">
                    <SheetClose asChild>
                        <Link
                            to="/"
                            className="rounded hover:bg-accent pl-2 dark:bg-foreground dark:hover:bg-accent inline-block"
                        >
                            <img
                                src={bwhLogo}
                                alt="BWH logo"
                                style={{ height: "50px" }}
                            />
                        </Link>
                    </SheetClose>
                    {isAuthenticated && (
                        <Collapsible className="grid gap-4 dark:bg-secondary">
                            <CollapsibleTrigger className="flex rounded-sm p-2 px-4 hover:bg-accent w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                Services{" "}
                                <ChevronRight className="ml-auto w-4 h-4 transition-all" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="grid gap-3 bg-gray-150 px-3">
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="services"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                All Services
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="flower-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Flower Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="gift-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Gift Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="drug-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Medicine Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="security"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Security Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="language-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Language Interpreter Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="sanitation"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Sanitation Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="room-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Room Scheduling Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="medical-device-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Medical Device Request
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <div className={""} />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                    <Collapsible className="grid gap-4 dark:bg-secondary">
                        <CollapsibleTrigger className="flex rounded-sm p-2 px-4 hover:bg-accent w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                            Map{" "}
                            <ChevronRight className="ml-auto w-4 h-4 transition-all" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid gap-3 bg-gray-150 px-3">
                                <SheetClose asChild>
                                    <Link
                                        className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                        to="map"
                                    >
                                        <div className="text-sm font-medium leading-none group-hover:underline">
                                            Map
                                        </div>
                                    </Link>
                                </SheetClose>
                                {isAuthenticated && (
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1"
                                            to="map-editor"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                Map Editor
                                            </div>
                                        </Link>
                                    </SheetClose>
                                )}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    {isAuthenticated && (
                        <SheetClose asChild>
                            <Link
                                className="group rounded-sm p-2 px-4 hover:bg-accent grid h-auto w-full justify-start gap-1"
                                to="data"
                            >
                                <div className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                    Data Viewer
                                </div>
                            </Link>
                        </SheetClose>
                    )}
                    {isAuthenticated && (
                        <SheetClose asChild>
                            <Link
                                className="group rounded-sm p-2 px-4 hover:bg-accent grid h-auto w-full justify-start gap-1"
                                to="credit-page"
                            >
                                <div className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                    Credit Page
                                </div>
                            </Link>
                        </SheetClose>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
