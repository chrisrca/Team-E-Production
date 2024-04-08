"use client";
import * as React from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../images/hamburger.jpg";
import bwhLogo from "../images/BWH logo.svg";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const services = [
    {
        title: "Flower Service Request",
        href: "/flower-service",
        description: "Flower Service Request",
    },
    {
        title: "Security Request",
        href: "/security",
        description: "Security Service Request",
    },
    {
        title: "Medicine Service Request",
        href: "/drug-service",
        description: "Medicine Service Request",
    },
];

const mapLevels = [
    {
        title: "Map Level 1",
        href: "/map",
        description: "Map Level 1",
    },
    {
        title: "Map Level 2",
        href: "/map",
        description: "Map Level 2",
    },
    {
        title: "Map Level 3",
        href: "/map",
        description: "Map Level 3",
    },
];

const dataViewer = [
    {
        title: "Nodes",
        href: "/data",
        description: "Node Data Viewer",
    },
    {
        title: "Edges",
        href: "/data",
        description: "Edge Data Viewer",
    },
    {
        title: "Flower Requests",
        href: "/map",
        description: "Flower Data Viewer",
    },
];

export default function Hamburger() {
    return (
        <Sheet>
            <SheetTrigger className="fixed top-0 z-50 pl-2 pt-2 flex">
                <img
                    className="bg-secondary rounded-md"
                    src={hamburgerIcon}
                    alt="Hamburger Icon"
                    style={{ height: "40px", width: "40px" }}
                />
            </SheetTrigger>
            <SheetContent side="left" className="dark:bg-secondary">
                <div className="grid gap-2 py-4">
                    <SheetClose asChild>
                        <Link
                            to="/"
                            className="rounded hover:bg-card pl-2 dark:bg-foreground dark:hover:bg-card inline-block"
                        >
                            <img
                                src={bwhLogo}
                                alt="BWH logo"
                                style={{ height: "50px" }}
                            />
                        </Link>
                    </SheetClose>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="w-full">
                                <Button className="rounded w-full font-medium leading-none text-left bg-gray-150 text-sm text-primary hover:bg-card">
                                    Services{" "}
                                    <ChevronRight className="w-4 h-4 inline-block" />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" className="-ml-28">
                            {services.map((service) => (
                                <DropdownMenuItem key={service.title} asChild>
                                    <SheetClose asChild>
                                        <Link
                                            to={service.href}
                                            className="rounded text-left block w-full"
                                        >
                                            <div className="text-sm font-medium leading-none">
                                                {service.title}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="w-full">
                                <Button className="rounded w-full font-medium leading-none text-left bg-gray-150 text-sm text-primary hover:bg-card">
                                    Maps{" "}
                                    <ChevronRight className="w-4 h-4 inline-block" />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" className="-ml-28">
                            {mapLevels.map((mapLevel) => (
                                <DropdownMenuItem key={mapLevel.title} asChild>
                                    <SheetClose asChild>
                                        <Link
                                            to={mapLevel.href}
                                            className="rounded text-left block w-full"
                                        >
                                            <div className="text-sm font-medium leading-none">
                                                {mapLevel.title}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="w-full">
                                <Button className="rounded w-full font-medium leading-none text-left bg-gray-150 text-sm text-primary hover:bg-card">
                                    Data Viewer{" "}
                                    <ChevronRight className="w-4 h-4 inline-block" />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" className="-ml-28">
                            {dataViewer.map((item) => (
                                <DropdownMenuItem key={item.title} asChild>
                                    <SheetClose asChild>
                                        <Link
                                            to={item.href}
                                            className="rounded text-left block w-full"
                                        >
                                            <div className="text-sm font-medium leading-none">
                                                {item.title}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SheetContent>
        </Sheet>
    );
}
