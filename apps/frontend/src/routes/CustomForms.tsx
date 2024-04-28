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


export default function FormMaker(){
    const[customForm] = useState([
        {
            content: "label",
            title: "(Example Form) Flower Service Request Form",
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
    const components = {
        textField : 
        {
            title : "Text Field"
        },
        select : 
        {
            title: "Select"
        },
        checkBox : 
        {
            title : "Checkbox"
        },
        radioButtons : 
        {
            title : "Radio Buttons"
        },
        locationSelector : 
        {
            title : "Location Selector"
        },
        employeeSelector : 
        {
            title : "Employee Selector"
        },
    };
    return(
        <>
        <div className={"bg-card w-full mx-auto rounded-lg transition-all h-fit grid grid-cols-3"}>
            <div className={"py-20"}>
                <div className={"bg-card w-full rounded-lg"}>
                    <div className={"m-5"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-fit h-10 bg-accent text-background font-bold">
                            Add Component
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"}>
                            <DropdownMenuLabel className={"bg-card rounded-sm"}>{"Select Component"}</DropdownMenuLabel>
                            {Object.keys(components).map((option, index) => {
                                return(
                                    <DropdownMenuItem 
                                        key={index}>
                                        <div className={"font-bold"}>
                                            {components[option]["title"]}
                                        </div>
                                    </DropdownMenuItem>
                                );
                                    
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                    "",)
                }
                </div>
                </div>
                </div>
        </>
    );
};

// const addField = () => {
//     const selectVal = "hallo";
//     return(
//         <>
//         <Select
                        
//                     >
//                         <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground">
//                             <SelectValue placeholder={selectVal} />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectLabel>{"Label"}</SelectLabel>
//                                 {/* Map options to select */}
//                                 {components.map((option) => (
//                                     <SelectItem
//                                         value={option.toString()}
//                                         className={
//                                             "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
//                                         }
//                                     >
//                                         {option}
//                                     </SelectItem>
//                                 ))}
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                     </>
//     );
// };