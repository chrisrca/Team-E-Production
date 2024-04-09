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
//import {Label} from "@/components/ui/label";
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
//import FormInput from "@/components/ui/formInput";

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

//type FormSchema = DrugDeliveryData | FlowerServiceRequest | TestSchema;

// type TableData = {
//     submission: string[];
// };

// type Submission = {
//     data: string[];
// };

// type formSchema = {
//     field1: string;
//     field2: string;
//     field3: string;
// };

// const tableComp = (props: TableData) => {
//     return (
//         <div className="p-10 m-auto w-min">
//             <Table>
//                 <TableCaption>List of requests.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Employee Name</TableHead>
//                         <TableHead>Location</TableHead>
//                         <TableHead>Message</TableHead>
//                         <TableHead>Gift</TableHead>
//                         <TableHead>Priority</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Anonymous</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {submissions.map((request) => (
//                         <TableRow key={request.toString()}>
//                             <TableCell>{request.employeeName}</TableCell>
//                             <TableCell>{request.location}</TableCell>
//                             <TableCell>{request.message}</TableCell>
//                             <TableCell>{request.gift}</TableCell>
//                             <TableCell>{request.priority}</TableCell>
//                             <TableCell>{request.status}</TableCell>
//                             <TableCell>{request.anonymous.toString()}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

type Component = {
    content: string; //Element content - (input, select, switch, button, ect)
    type: string; //Element type - (string, number, etc)
    title: string; //Element title
    placeholder: string; //Displayed placeholder text
    required: boolean; //Required field?
    id: number;
};

type FormSelect = Component & {
    label: string; // Options label
    options: string[]; //Displayed options
};

export interface FlowerServiceRequest {
    patientName: string;
    roomNumber: string;
    senderName: string;
    cardMessage: string;
    flowerType: string;
}

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
    layout: (Component | FormSelect)[],
    blankSchema: NonNullable<unknown>,
) => {
    const formSchema = { ...blankSchema };
    const schemaKeys = [] as string[];

    Object.keys(formSchema).map((value) => {
        schemaKeys.push(value);
    });

    console.log(formSchema);
    console.log(schemaKeys);

    // Form Generation
    const makeForm = (props: FormSelect[] | Component[]) => {
        return (
            <>
                <div className="flex flex-col flex-auto w-[35rem] m-auto p-10 space-y-8 items-left">
                    {props.map(identifyComponent)}
                </div>
            </>
        );
    };
    // Identify element to return based on value of Component.type
    const identifyComponent = (props: Component) => {
        if (props.content.includes("text")) {
            return inputComp(props);
        } else if (props.content.includes("select")) {
            return selectComp(props as FormSelect);
        } else {
            console.error("Failed to identify element - " + props.type);
        }
    };

    //Beginning of Elements

    const inputComp = (props: Component) => {
        console.log("making input element");
        return (
            <>
                <div className="">
                    <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
                        {props.title}
                    </label>
                    <Input
                        type={props.type}
                        placeholder={props.placeholder}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            (formValues[props.id] = e.target.value.toString())
                        }
                    />
                </div>
            </>
        );
    };
    const selectComp = (props: FormSelect) => {
        return (
            <>
                <div className="">
                    <label className="block uppercase tracking-wide text-foreground text-xs font-bold mb-2">
                        {props.title}
                    </label>
                    <Select
                        required={props.required}
                        onValueChange={(value: string) =>
                            (formValues[props.id] = value.toString())
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{props.label}</SelectLabel>
                                {/* Map options to select */}
                                {props.options.map((option) => (
                                    <SelectItem value={option.toString()}>
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

    //End of Elements

    const formValues = [] as string[];
    const submittedServiceData = [] as (typeof blankSchema)[];

    // Assign id to each element specified in layout based on order in the form,
    // determines where form values are sent on submit
    layout.map((field) => (field.id = layout.indexOf(field)));

    const handleSubmit = (e: FormEvent) => {
        // Shallow copy of formSchema that is discarded after submit,
        // Pushed to submittedServicesData and adheres to provided interface
        const formData = { ...formSchema };

        // Prevent reload on submit
        e.preventDefault();

        // Saving of data
        // Using array of keys, maps data held in formValues to formData object
        // (lint doesn't like that form doesn't have a promised type)

        schemaKeys.map(
            (field) =>
                (formData[field] = formValues[schemaKeys.indexOf(field)]),
        );

        console.log(formValues);

        // Add current submission to array of submissions
        submittedServiceData.push(formData);

        // Push submission to console
        console.log(formData);

        // Push all submissions for current session to console
        console.log(submittedServiceData);

        // Not really necessary but clear formValues for next submit
        formValues.fill("");
    };

    return (
        <>
            <div className="flex flex-col space-y-8 items-center bg-secondary w-[35rem] rounded m-auto ">
                <form className="rounded" onSubmit={handleSubmit}>
                    {makeForm(layout)}
                    <button
                        className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                        type={"submit"}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
