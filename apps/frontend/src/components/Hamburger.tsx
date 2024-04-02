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
      <SheetTrigger className="fixed top-0 z-50 pl-2 pt-2">
        <img
          src={hamburgerIcon}
          alt="Hamburger Icon"
          style={{ height: "40px" }}
        />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-2 py-4">
          <SheetClose asChild>
            <Link to="/login" className="rounded hover:bg-gray-200 pl-2">
              <img src={bwhLogo} alt="BWH logo" style={{ height: "50px" }} />
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/flower-service"
              className="text-black hover:bg-gray-200 rounded pl-2"
            >
              Flower Service Request
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/map"
              className="text-black hover:bg-gray-200 rounded pl-2"
            >
              Maps
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
