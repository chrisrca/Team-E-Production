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
      <SheetTrigger className="fixed top-0 z-50">
        <img
          src={hamburgerIcon}
          alt="Hamburger Icon"
          style={{ height: "40px" }}
        />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-4 py-4">
          <SheetClose asChild>
            <Link to="/login" className="rounded hover:bg-gray-200">
              <img src={bwhLogo} alt="BWH logo" style={{ height: "50px" }} />
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <div className="rounded hover:bg-gray-200 min-h-10">
              <Link
                to="/flower-service"
                className="text-black hover:text-black"
              >
                Flower Service Request
              </Link>
            </div>
          </SheetClose>
          <SheetClose asChild>
            <div className="rounded hover:bg-gray-200 min-h-10">
              <Link to="/map" className="text-black hover:text-black">
                Maps
              </Link>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
