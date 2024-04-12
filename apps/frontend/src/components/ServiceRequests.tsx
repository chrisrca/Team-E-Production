"use client";
import * as React from "react";
import { FormEvent, ChangeEvent } from "react";
//import { SubmitEvent } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
//import { TestSchema } from "common/src/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlowerServiceRequest } from "common/src/types";
//import Lilacs from "/src/images/Lilacs.jpg";
//import { BWH } from "@/src/images/BWH-high-res.jpg";
//import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger
// } from "@/components/ui/popover";
// import {Button} from "@/components/ui/button";
//import FormInput from "@/components/ui/formInput";

type FormLabel = {
    content: string; //Element content - (input, select, switch, button, ect)
    title: string; //Element title
    type: string; //Element type - (string, number, etc)
    id: number;
};

type FormComponent = FormLabel & {
    placeholder: string; //Displayed placeholder text
    required: boolean; //Required field?
};

type FormSelect = FormComponent & {
    label: string; // Options label
    options: string[]; //Displayed options
};

// layout: an array of objects of type component, how to define the objects is shown above
// blankSchema: whatever type/interface you assign to the output of your form, just pass a blank version
/*              for instance, for a FlowerServiceRequest form using the interface FlowerServiceRequest:
 *
 * interface FlowerServiceRequest {
 *   patientName: string;
 *   roomNumber: string;
 *   senderName: string;
 *   cardMessage: string;
 *   flowerType: string;
 * }
 *
 * You would simply pass an object with blank values:
 *
 * const defaultSchema {
 *   patientName: "",
 *   roomNumber: "",
 *   senderName: "",
 *   cardMessage: "",
 *   flowerType: "",
 * }
 * */

export const ServiceRequests = (
    layout: (FormLabel | FormComponent | FormSelect)[],
    blankSchema: NonNullable<unknown>,
    apiPath: string,
    bgPath: string,
) => {
    const formSchema = { ...blankSchema };
    const schemaKeys = [] as string[];

    Object.keys(formSchema).map((value) => {
        schemaKeys.push(value);
    });

    console.log(formSchema);
    console.log(schemaKeys);

    async function sendForm(formData: FlowerServiceRequest, apiPath: string) {
        axios.post([apiPath], formData).then((res) => {
            console.log(res);
        });
    }

    // Form Generation
    const makeForm = (props: (FormLabel | FormComponent | FormSelect)[]) => {
        return (
            <>
                <div className="space-y-6 grid grid-col grid-cols-2">
                    {props.map(identifyComponent)}
                </div>
            </>
        );
    };
    // Identify element to return based on value of Component.type
    const identifyComponent = (
        props: FormLabel | FormComponent | FormSelect,
    ) => {
        if (props.content.includes("text")) {
            return inputComp(props as FormComponent);
        } else if (props.content.includes("select")) {
            return selectComp(props as FormSelect);
        } else if (props.content.includes("label")) {
            return labelComp(props as FormLabel);
        } else if (props.content.includes("radio")) {
            return radioGroupComp(props as FormSelect);
        } else if (props.content.includes("checkbox")) {
            formValues[props.id] = "false";
            return checkboxComp(props as FormComponent);
        } else {
            console.error("Failed to identify element - " + props.type);
        }
    };

    //Beginning of Elements

    const labelComp = (props: FormLabel) => {
        console.log("making label element");
        return (
            <>
                <div className="text-extrabold col-span-2 text-center text-3xl">
                    <Label>{props.title}</Label>
                </div>
            </>
        );
    };

    const inputComp = (props: FormComponent) => {
        console.log("making input element");
        return (
            <>
                <div className="col-span-2">
                    <label
                        className={
                            "block col-span-2 text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <div className={"px-2"}>
                        <Input
                            type={props.type}
                            placeholder={props.placeholder}
                            required={props.required}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                (formValues[props.id] =
                                    e.target.value.toString())
                            }
                            className={
                                "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                            }
                        />
                    </div>
                </div>
            </>
        );
    };
    const selectComp = (props: FormSelect) => {
        return (
            <>
                <div className="col-span-1">
                    <label className="block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1">
                        {props.title}
                    </label>
                    <div className={"px-2"}>
                        <Select
                            required={props.required}
                            onValueChange={(value: string) =>
                                (formValues[props.id] = value.toString())
                            }
                        >
                            <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{props.label}</SelectLabel>
                                    {/* Map options to select */}
                                    {props.options.map((option) => (
                                        <SelectItem
                                            value={option.toString()}
                                            className={""}
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </>
        );
    };

    const radioGroupComp = (props: FormSelect) => {
        return (
            <>
                <div className={"col-span-2"}>
                    <label
                        className={
                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <div
                        className={
                            "p-2 w-fit bg-background border-input border shadow-md rounded"
                        }
                    >
                        <RadioGroup
                            onValueChange={(value: string) =>
                                (formValues[props.id] = value.toString())
                            }
                        >
                            {/* Map options to select */}
                            <div className="flex px-4 space-x-4">
                                {props.options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex items-center"
                                    >
                                        <RadioGroupItem
                                            className={"hover:bg-accent"}
                                            value={option}
                                        />
                                        <Label className="ml-2 text-sm font-medium text-gray-700 dark:text-foreground">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </>
        );
    };

    const checkboxComp = (props: FormComponent) => {
        return (
            <>
                <div
                    className={
                        "flex col-span-1 container:ml-0 pl-6 pt-2 align-content-center "
                    }
                >
                    <Checkbox
                        required={props.required}
                        onCheckedChange={(value: boolean) =>
                            (formValues[props.id] = value.toString())
                        }
                        className={"hover:bg-accent my-auto"}
                    >
                        {props.title}
                    </Checkbox>
                    <Label className="ml-4 text-sm font-medium text-gray-700 dark:text-foreground my-auto">
                        {props.placeholder}
                    </Label>
                </div>
            </>
        );
    };

    // const popoverComp = () => {
    //     return(
    //         <>
    //             <Popover>
    //                 <PopoverTrigger asChild>
    //                     <Button className="mt-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-background text-sm font-medium text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    //                         {securityData.location || "Select Location"}
    //                     </Button>
    //                 </PopoverTrigger>
    //                 <PopoverContent className="origin-top-right absolute mt-2 max-h-60 overflow-y-auto rounded-md shadow-lg">
    //                     <Input
    //                         ref={searchRef}
    //                         className="w-full"
    //                         placeholder="Search location..."
    //                         value={searchTerm}
    //                         onChange={(e) => setSearchTerm(e.target.value)}
    //                     />
    //                     {filteredNodes.map((node) => (
    //                         <div
    //                             key={node.nodeID}
    //                             className="p-2 hover:bg-secondary cursor-pointer rounded-md"
    //                             onClick={() =>
    //                                 handleLocationSelect(
    //                                     node.nodeID,
    //                                     node.longName,
    //                                 )
    //                             }
    //                         >
    //                             {node.longName}
    //                         </div>
    //                     ))}
    //                 </PopoverContent>
    //             </Popover>
    //         </>
    //     );
    // }

    //End of Elements

    const formValues = [] as string[];
    const submittedServiceData = [] as (typeof blankSchema)[];

    // Assign id to each element specified in layout based on order in the form,
    // determines where form values are sent on submit
    layout.map((field) => (field.id = layout.indexOf(field) - 1));

    const handleSubmit = (e: FormEvent) => {
        // Shallow copy of formSchema that is discarded after submit,
        // Pushed to submittedServicesData and adheres to provided interface
        const formData = { ...formSchema };

        // Prevent reload on submit
        e.preventDefault();

        // Saving of data
        // Using array of keys, maps data held in formValues to formData object
        // (lint doesn't like that formData doesn't have a promised type)

        schemaKeys.map(
            (field) =>
                (formData[field] = formValues[schemaKeys.indexOf(field)]),
        );

        console.log(formValues);

        // Add current submission to array of submissions
        submittedServiceData.push(formData);
        sendForm(formData, apiPath);

        // Push submission to console
        console.log(formData);

        // Push all submissions for current session to console
        console.log(submittedServiceData);

        // Not really necessary but clear formValues for next submit
    };

    return (
        <>
            <section
                className="fixed blur-[3px] top-0 bg-white bg-cover content-center size-full"
                style={{
                    backgroundImage: `url(${[bgPath]})`,
                }}
            />
            <div className="">
                <div className="w-full content-center relative">
                    {/* Hero Section */}

                    <div className={"py-16"}>
                        <div className="flex flex-auto mx-auto grid block shadow-lg size-fit bg-secondary w-[35rem] rounded-lg border-4 border-background">
                            <form
                                className="w-full px-16 py-8"
                                onSubmit={handleSubmit}
                            >
                                {makeForm(layout)}
                                <div
                                    className={"pt-8 grid grid-col grid-cols-2"}
                                >
                                    <button
                                        className="bg-accent hover:bg-destructive text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                        type={"clear"}
                                    >
                                        Clear Form
                                    </button>
                                    <button
                                        className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                        type={"submit"}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
