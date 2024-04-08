"use client";
import * as React from "react";
import { FormEvent, ChangeEvent } from "react";
//import { SubmitEvent } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//    FormLabel,
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

type Component = {
    type: string; //Element type - (input, select, switch, button, ect)
    title: string; //Element title
    placeholder: string; //Displayed placeholder text
    required: boolean; //Required field?
    id: number;
};

type FormSelect = Component & {
    label: string; // Options label
    options: string[]; //Displayed options
};

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

export const ServiceRequests = () => {
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

    const identifyComponent = (props: Component) => {
        if (props.type.includes("text")) {
            // console.log(props.title);
            // console.log("component == text");
            return inputComp(props);
        } else if (props.type.includes("select")) {
            // console.log(props.title);
            // console.log("component == select");
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
                        type={props.title}
                        placeholder={props.placeholder}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            (serviceReqArr[props.id] = e.target.value)
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
                        onValueChange={(value: string) =>
                            (serviceReqArr[props.id] = value)
                        }
                        required={props.required}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{props.label}</SelectLabel>
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

    //const serviceRequestData = [[]];

    const test = [
        {
            type: "text",
            title: "text 1",
            placeholder: "text placeholder 1",
            required: true,
            id: 0,
        },
        {
            type: "select",
            title: "select 1",
            placeholder: "select placeholder 1",
            required: false,
            id: 0,
            label: "Options",
            options: ["option 1", "option 2", "option 3"],
        },
        {
            type: "text",
            title: "text 2",
            placeholder: "text placeholder 2",
            required: true,
            id: 0,
        },
    ];

    const serviceReqArr = [""];
    const serviceReqData = [[""]];

    const serviceReq = () => {
        test.map((field) => (field.id = test.indexOf(field)));
        console.log(test);
    };

    serviceReq();
    console.log(serviceReqArr);

    // const [serviceReq, setServiceRequest] = useState<formSchema>({
    //
    //
    // });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        //Saving of data
        serviceReqData.push(serviceReqArr);

        console.log(serviceReqArr);
        //Clearing of form
        serviceReqArr.fill("");
    };

    return (
        <>
            <div className="flex flex-col space-y-8 items-center bg-secondary w-[35rem] rounded m-auto ">
                <form className="rounded" onSubmit={handleSubmit}>
                    {makeForm(test)}
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
