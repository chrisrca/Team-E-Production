"use client";
import * as React from "react";
import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

type Component = {
    type: string; //Element type - (input, select, switch, button, ect)
    title: string; //Element title
    placeholder: string; //Displayed placeholder text
    required: boolean; //Required field?
};

type FormSelect = Component & {
    label: string; // Options label
    options: string[]; //Displayed options
};

type Submission = {
    data: string[];
};

const test = [
    {
        type: "text",
        title: "text 1",
        placeholder: "placeholder 1",
        required: true,
    },
    {
        type: "select",
        title: "select 1",
        placeholder: "select placeholder 1",
        required: false,
        label: "Options",
        options: ["option 1", "option 2", "option 3"],
    },
];

const makeForm = (props: Component[]) => {
    return (
        <>
            <div className="w-[35rem] m-auto p-10">{mapElements(props)}</div>
        </>
    );
};

const mapElements = (props: Component[]) => {
    console.log(props);
    return props.map(identifyComponent);
};

const identifyComponent = (props: Component) => {
    if (props.type.includes("text")) {
        console.log(props.title);
        console.log("component == text");
        return inputComp(props);
    } else if (props.type.includes("select")) {
        console.log(props.title);
        console.log("component == select");
        return selectComp(props as FormSelect);
    } else {
        console.error("Failed to identify element - " + props.type);
    }
};
const inputComp = (props: Component) => {
    console.log("making input element");
    return (
        <>
            <Input type={props.title} placeholder={props.placeholder} />
        </>
    );
};

const selectComp = (props: FormSelect) => {
    return (
        <>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{props.label}</SelectLabel>
                        {props.options.map((value) => (
                            <SelectItem value={value.toString()}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
};

// const formSchema = z.object({
//     employeeName: z.string().min(1, {
//         message: "Please specify Employee name.",
//     }),
//     location: z.string().min(1, {
//         message: "Please specify a location.",
//     }),
//     message: z.string(),
//     gift: z.string().min(1, {
//         message: "Please select a gift.",
//     }),
//     priority: z.string(),
//     status: z.string(),
//     anonymous: z.boolean(),
// });

export const ServiceRequests = () => {
    const [submissions, setSubmissions] = useState(new Array<Submission>());
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         employeeName: "",
    //         location: "",
    //         message: "",
    //         gift: "",
    //         priority: "",
    //         status: "",
    //         anonymous: false,
    //     },
    // });
    //
    // // 2. Define a submit handler.
    function onSubmit(values: Submission) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setSubmissions([...submissions, values]);
    }
    onSubmit;

    return <>{makeForm(test)}</>;
};
