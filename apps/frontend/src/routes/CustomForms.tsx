import * as React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { 
    ServiceRequests, 
    //FormSelect 
} from "@/components/ServiceRequests";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

import {
    DropdownMenu,
    //DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    //DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


export default function FormMaker(){  
    const[customForm] = useState([
        {
            content: "label",
            title: "Flower Service Request Form",
            type: "header",
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: "Patient Name",
            placeholder: "First, Last",
            required: true,
            id: 0,
        },
        {
            content: "select",
            type: "string",
            title: "Type of Flower",
            placeholder: "Please Select Flower",
            required: true,
            id: 0,
            label: "Status",
            options: ["Roses - $13", "Lilies - $50", "Chrysanthemums - $1000"],
        },
        {
            content: "text",
            type: "string",
            title: "Sender Name",
            placeholder: "First, Last",
            required: true,
            id: 0,
        },
        {
            content: "text",
            type: "string",
            title: "Message",
            placeholder: "Enter Message (Optional)",
            required: false,
            id: 0,
        },
        {
            content: "popover",
            type: "string",
            title: "Select Location",
            placeholder: "Select Placeholder 2",
            required: true,
            id: 0,
            label: "",
            options: [],
        },
        {
            content: "radio",
            type: "string",
            title: "Status",
            placeholder: "",
            required: true,
            id: 0,
            label: "Request Status",
            options: ["Unassigned", "Assigned", "In Progress", "Closed"],
        },
        {
            content: "radio",
            type: "string",
            title: "Priority",
            placeholder: "",
            required: true,
            id: 0,
            label: "Request Priority",
            options: ["Low", "Medium", "High", "Emergency"],
        },
        {
            content: "employee",
            type: "string",
            title: "Assign Employee",
            placeholder: "Select Employee",
            required: false,
            id: 0,
            label: "",
            options: [],
        },
]);

    Object.keys(customForm[1]).map((key) => {
        console.log(customForm[1][key]);
    });

    const[currComponent, setCurrComponent] = useState("");

    const addField = (props) => {
        if(props === ""){
            return;
        }else{
            return(
                <>
                    <div className={"size-5 bg-red-900"}>
                        {props["content"]}
                    </div>
                </>
            );
        }
    };

    const components = {
        textField : 
        {
            display : "Text Field",
            content: "text",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
        select : 
        {
            display: "Select",
            content: "select",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
        checkBox : 
        {
            display : "Checkbox",
            content: "checkbox",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
        radioButtons : 
        {
            display : "Radio Buttons",
            content: "radio",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
        locationSelector : 
        {
            display : "Location Selector",
            content: "popover",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
        employeeSelector : 
        {
            display : "Employee Selector",
            content: "employee",
            title: "",
            placeholder: "",
            required: "",
            id: "",
            label: "",
            options: "",
        },
    };
    return(
        <>
        <div className={"bg-card w-full mx-auto rounded-lg transition-all h-fit grid grid-cols-3"}>
            <div className={"py-20"}>
                <div className={"bg-card w-full rounded-lg"}>
                    <div className={"m-5"}>
                    <Popover>
                    <PopoverTrigger>
                        <Button className="flex h-10 w-50 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary">
                            {currComponent["display"] ||
                                "Select Field to Filter"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-left absolute max-h-80 w-fit overflow-y-auto rounded-md">
                        {Object.keys(components).map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize"
                                onClick={() => {
                                    //console.log(option);
                                    setCurrComponent(components[option]);
                                }}
                            >
                                {components[option]["display"]}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
                    {addField(currComponent)}
                    </div>
                    <div className={"m-5"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-fit h-10 bg-primary text-background font-bold">
                            Remove/Edit Component
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"}>
                            <DropdownMenuLabel className={"bg-card rounded-sm"}>{"Select Component"}</DropdownMenuLabel>
                            {customForm.map((option, index) => {
                                return(
                                    <DropdownMenuItem 
                                        key={index}>
                                        <div className={"font-bold capitalize"}>
                                            {"ID "}
                                            {option.id}
                                            {" : "}
                                            {option.content}
                                        </div>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
            </div>
                            
                <div className={"bg-background w-full h-screen col-span-2 px-16 overflow-auto overflow-y-scroll"}>
                <div className={"bg-background py-4 relative h-fit font-bold text-center w-fit text-2xl mx-auto rounded-lg"}>
                Form Preview
                </div>
                <div className={"mx-auto"}>
                {ServiceRequests(
                    customForm,
                    {},
                    "",
                    "",
                    "",
                )
                }
                </div>
                </div>
                </div>
        </>
    );
};