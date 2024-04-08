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

export default function Hamburger() {
    return (
        <Sheet>
            <SheetTrigger className="fixed top-0 z-50 pl-2 pt-2 items-center justify-center">
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
                            className="rounded hover:bg-card pl-2 dark:bg-foreground dark:hover:bg-card"
                        >
                            <img
                                src={bwhLogo}
                                alt="BWH logo"
                                style={{ height: "50px" }}
                            />
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/flower-service"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Flower Service Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/drug-service"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Medicin Service Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/gift-service"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Gift Service Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/sanitation"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Sanitation Service Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/language-service"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Language Interpreter Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/room-service"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Room Service Request
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/map"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Maps
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            to="/data"
                            className="text-primary hover:bg-card rounded pl-2"
                        >
                            Data Viewer
                        </Link>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
