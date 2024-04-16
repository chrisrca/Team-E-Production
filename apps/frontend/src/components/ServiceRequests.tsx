"use client";
import * as React from "react";
import { FormEvent, useState, useRef, useEffect } from "react";
//import { SubmitEvent } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
//import { TestSchema } from "common/src/types";
import { Label } from "@/components/ui/label";
import { DBNode } from "common/src/types";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { Input } from "@/components/ui/input";

type FormLabel = {
    content: string; //Element content - (input, select, switch, button, ect)
    title: string; //Element title
    type: string; //Element type - (string, number, etc)
    id: number;
};

type FormComponent = FormLabel & {
    placeholder: string; //Displayed placeholder text
    required: boolean; //Required field?
    variant: string;
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
    const [formSchema, setFormSchema] = useState(structuredClone(blankSchema));
    const schemaKeys = [] as string[];

    Object.keys(formSchema).map((value) => {
        schemaKeys.push(value);
    });

    console.log(formSchema);
    console.log(schemaKeys);

    async function sendForm(formData, apiPath: string) {
        axios.post([apiPath], formData).then((res) => {
            console.log(res);
        });
    }

    // Form Generation
    const makeForm = (props: (FormLabel | FormComponent | FormSelect)[]) => {
        return (
            <>
                <div className="grid gap-x-4 gap-y-6 grid-flow-dense grid-cols-2 auto-rows-auto">
                    {props.map(identifyComponent)}
                </div>
            </>
        );
    };
    // Identify element to return based on value of Component.content
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
            return checkboxComp(props as FormComponent);
        } else if (props.content.includes("popover")) {
            return LocationComp(props as FormComponent);
        } else {
            console.error("Failed to identify element - " + props.type);
        }
    };

    //Beginning of Elements

    const labelComp = (props: FormLabel) => {
        console.log("making label '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className="col-span-full text-extrabold basis-full text-center text-3xl">
                    <Label>{props.title}</Label>
                </div>
            </>
        );
    };

    const inputComp = (props: FormComponent) => {
        console.log("making input '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className="col-span-full">
                    <label
                        className={
                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <FormInput
                        type={props.type}
                        placeholder={props.placeholder}
                        required={props.required}
                        variant={props.variant}
                        onChange={(e) =>
                            (formSchema[schemaKeys[props.id]] =
                                e.target.value.toString())
                        }
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                        }
                    />
                </div>
            </>
        );
    };
    const selectComp = (props: FormSelect) => {
        console.log("making select '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className="col-auto">
                    <label className="block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1">
                        {props.title}
                    </label>
                    <Select
                        required={props.required}
                        onValueChange={(value) =>
                            (formSchema[schemaKeys[props.id]] =
                                value.toString())
                        }
                    >
                        <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground">
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{props.label}</SelectLabel>
                                {/* Map options to select */}
                                {props.options.map((option) => (
                                    <SelectItem
                                        value={option.toString()}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                        }
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </>
        );
    };

    const radioGroupComp = (props: FormSelect) => {
        console.log("making radio '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className={"col-auto"}>
                    <label
                        className={
                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <div
                        className={
                            "p-2 w-full bg-background border-input border shadow-md rounded"
                        }
                    >
                        <RadioGroup
                            onChange={(e) =>
                                (formSchema[schemaKeys[props.id]] =
                                    e.target.value.toString())
                            }
                        >
                            {/* Map options to select */}
                            <div className="flex grid grid-flow-dense grid-cols-auto grid-rows-auto px-4">
                                {props.options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex cols-span-1"
                                    >
                                        <RadioGroupItem
                                            className={"hover:bg-accent"}
                                            value={option}
                                        />
                                        <Label className="ml-2 text-sm font-medium text-gray-700 dark:text-foreground flex-nowrap">
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
        console.log("making checkbox '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className={"flex col-span-1 container:ml-0 pl-6 pt-2"}>
                    <Checkbox
                        required={props.required}
                        onChange={(e) =>
                            (formSchema[schemaKeys[props.id]] =
                                e.target.value.toString())
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

    const LocationComp = (props: FormComponent) => {
        console.log(
            "making Popover(Location) '" + props.title + "' id: " + props.id,
        );
        console.log(formSchema[schemaKeys[props.id]]);

        //const [location, setLocation] = useState("");

        const [nodes, setNodes] = useState<DBNode[]>([]);

        useEffect(() => {
            async function fetchNodes() {
                try {
                    const response = await axios.get("/api/nodes");
                    const originalNodes = response.data;
                    const returnNodes = originalNodes
                        .filter((node) => {
                            return node.nodeType != "HALL";
                        })
                        .sort(function (a, b) {
                            if (a.longName < b.longName) {
                                return -1;
                            }
                            if (a.longName > b.longName) {
                                return 1;
                            }
                            return 0;
                        });
                    setNodes(returnNodes);
                } catch (error) {
                    console.error("Failed to fetch nodes: ", error);
                }
            }
            fetchNodes();
        }, []);

        const [filteredNodes, setFilteredNodes] = useState(nodes);
        const [searchTerm, setSearchTerm] = useState("");
        const searchRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            setFilteredNodes(
                nodes.filter((node) =>
                    node.longName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                ),
            );
        }, [searchTerm, nodes]);

        const handleLocationSelect = (longName: string) => {
            console.log(longName);
            setFormSchema({ ...formSchema, [schemaKeys[props.id]]: longName });
            setSearchTerm("");
        };

        console.log(nodes);

        return (
            <div className={"col-span-auto"}>
                <label
                    className={
                        "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                    }
                >
                    {props.title}
                </label>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="flex h-10 w-full rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 text-sm text-bold font-medium text-gray-700 dark:text-foreground">
                            {formSchema[schemaKeys[props.id]] ||
                                "Select Location"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-right absolute max-h-60 overflow-y-auto rounded-md shadow-lg">
                        <Input
                            ref={searchRef}
                            className="w-full mb-2"
                            placeholder="Search location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredNodes.map((node) => (
                            <div
                                key={node.nodeID}
                                className="p-2 hover:bg-accent hover-text cursor-pointer rounded-md hover:text-accent-foreground"
                                onClick={() =>
                                    handleLocationSelect(node.longName)
                                }
                            >
                                {node.longName}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    //End of Elements

    const submittedServiceData = [] as (typeof blankSchema)[];

    // Assign id to each element specified in layout based on order in the form,
    // determines where form values are sent on submit
    layout.map((field) => (field.id = layout.indexOf(field) - 1));

    console.log(layout);

    const handleSubmit = (e: FormEvent) => {
        // Prevent reload on submit
        e.preventDefault();

        // Saving of data
        // Using array of keys, maps data held in formValues to formData object
        // (lint doesn't like that formData doesn't have a promised type)

        console.log(layout);

        console.log(formSchema);

        // Add current submission to array of submissions
        submittedServiceData.push(formSchema);
        sendForm(formSchema, apiPath);

        // Push submission to console
        // Push all submissions for current session to console
        console.log(submittedServiceData);

        // Not really necessary but clear formValues for next submit
    };

    const handleClearForm = (e: FormEvent) => {
        e.preventDefault();
        setFormSchema(structuredClone(blankSchema));
        // Reset the form fields
        const formElement = e.currentTarget.closest("form");
        if (formElement) {
            formElement.reset();
        }
    };

    return (
        <>
            <section
                className="fixed blur-[5px] top-0 bg-white bg-cover content-center size-full"
                style={{
                    backgroundImage: `url(${[bgPath]})`,
                }}
            />
            <div className="flex justify-center container shrink-0 w-full h-dvh">
                <div className="m-auto relative w-2/3 min-w-[35rem]">
                    <div className="block shadow-lg bg-secondary rounded-lg border-4 border-background">
                        <form className="px-16 py-8" onSubmit={handleSubmit}>
                            {makeForm(layout)}
                            <div className={"pt-16 grid grid-col grid-cols-3 "}>
                                <button
                                    className="bg-accent hover:bg-destructive text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                    type="reset"
                                    onClick={handleClearForm}
                                >
                                    Clear Form
                                </button>
                                <div></div>
                                <button
                                    className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
