import * as React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    ServiceRequests,
    //FormSelect
} from "@/components/ServiceRequests";
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
//     DropdownMenu,
//     //DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     //DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput";
import { Plus, Minus } from 'lucide-react';

export default function FormMaker() {
    const [customForm, setCustomForm] = useState([
        // {
        //     content: "label",
        //     title: "Flower Service Request Form",
        //     type: "header",
        //     id: 0,
        // },
        // {
        //     content: "text",
        //     type: "string",
        //     title: "Patient Name",
        //     placeholder: "First, Last",
        //     required: true,
        //     id: 0,
        // },
        // {
        //     content: "select",
        //     type: "string",
        //     title: "Type of Flower",
        //     placeholder: "Please Select Flower",
        //     required: true,
        //     id: 0,
        //     label: "Status",
        //     options: ["Roses - $13", "Lilies - $50", "Chrysanthemums - $1000"],
        // },
        // {
        //     content: "text",
        //     type: "string",
        //     title: "Sender Name",
        //     placeholder: "First, Last",
        //     required: true,
        //     id: 0,
        // },
        // {
        //     content: "text",
        //     type: "string",
        //     title: "Message",
        //     placeholder: "Enter Message (Optional)",
        //     required: false,
        //     id: 0,
        // },
        // {
        //     content: "popover",
        //     type: "string",
        //     title: "Select Location",
        //     placeholder: "Select Placeholder 2",
        //     required: true,
        //     id: 0,
        //     label: "",
        //     options: [],
        // },
        // {
        //     content: "radio",
        //     type: "string",
        //     title: "Status",
        //     placeholder: "",
        //     required: true,
        //     id: 0,
        //     label: "Request Status",
        //     options: ["Unassigned", "Assigned", "In Progress", "Closed"],
        // },
        // {
        //     content: "radio",
        //     type: "string",
        //     title: "Priority",
        //     placeholder: "",
        //     required: true,
        //     id: 0,
        //     label: "Request Priority",
        //     options: ["Low", "Medium", "High", "Emergency"],
        // },
        // {
        //     content: "employee",
        //     type: "string",
        //     title: "Assign Employee",
        //     placeholder: "Select Employee",
        //     required: false,
        //     id: 0,
        //     label: "",
        //     options: [],
        // },
    ]);

    // Object.keys(customForm[1]).map((key) => {
    //     console.log(customForm[1][key]);
    // });

    const [currComponent, setCurrComponent] = useState("");
    const[currEdit, setCurrEdit] = useState(
        -2
    );

    const AddField = (props, edit) => {
        

        const [newObject, setNewObject] = useState(
            {}
        );

        // console.log(props);
        // console.log(edit);
        // console.log(customForm);
        // console.log(newObject);
        
        
        if((edit && props != undefined) && newObject["content"] !== props["content"]){
            setNewObject(
                props
            );
        }else if(!edit && newObject["content"] !== props["content"]){
            setNewObject(
                props
            );
        }

        if(edit){props = newObject;}

        const [options, setOptions] = useState([]);
        const [option, setOption] = useState("");
        
        // console.log(newObject);
        // console.log(customForm);
        // console.log(edit.toString());
        const handleOption = (type: string, field) => {
            if(field === "type"){
                return(
                    <Select
                        onValueChange={(value) =>
                            setNewObject({
                                ...newObject,
                                [field] : value}
                            )
                        }
                    >
                        <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground">
                            <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className={"bg-card rounded-sm"}>{"Select Type"}</SelectLabel>
                                    <SelectItem
                                        value={"string"}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                        }
                                    >
                                        {"String"}
                                    </SelectItem>
                                    <SelectItem
                                        value={"number"}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                        }
                                    >
                                        {"Number"}
                                    </SelectItem>
                                    <SelectItem
                                        value={"time"}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                        }
                                    >
                                        {"Time"}
                                    </SelectItem>
                                    <SelectItem
                                        value={"datetime-local"}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground"
                                        }
                                    >
                                        {"Time-Date"}
                                    </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );
            }

            if (type === "string"){
                return(
                    <FormInput
                        placeholder={props[field]}
                        className={
                            "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                         }
                        onChange={e => {
                            setNewObject({
                                ...newObject,
                                [field] : e.target.value}
                                //console.log(newObject);
                            );
                        }}
                    />
                );
            }else if(type === "boolean"){
                return(
                    <Checkbox
                        onCheckedChange={checked => {
                            setNewObject({
                                ...newObject,
                                [field] : checked}
                                //console.log(newObject);
                            );
                        }}
                        className={"hover:bg-accent my-auto ml-5 mt-2"}
                    />
                );
            }else if(type === "number"){
                return(
                    <FormInput
                        placeholder={field}
                        type={"number"}
                        className={
                            "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                         }
                        onChange={e => {
                            setNewObject({
                                ...newObject,
                                [field] : e.target.value}
                            );
                        }}
                    />
                );
            }else if(type === "object"){
                return(
                    <div className={"flex flex-row flex-nowrap"}>
                        <FormInput
                        placeholder={field}
                        type={"string"}
                        className={
                            "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                         }
                        onChange={e => {
                            // console.log(option);
                            setOption(e.target.value);
                        }}
                        />
                        <Button
                            className={"size-8 p-0 mx-2 bg-green-300 self-center"}
                            onClick={() => {
                                setOptions([...options, option]);
                                setNewObject({
                                    ...newObject,
                                    [field] : options}
                                );
                            }}
                        >
                            <Plus
                            className={"transition-all"}
                            />
                        </Button>
                        {options.map((op) => {
                            return(op);
                        })}
                    </div>
                );
            }
            // console.log("TYPE ==" + type);
            return;
        };

        if (props === "") {
            return;
        } else {
            if(newObject["content"] === undefined && !edit){ 
                // console.log(newObject);
                // console.log(customForm);
                // console.log(edit.toString());
                setNewObject({
                    ...newObject,
                    content : props["content"]}
                    //console.log(newObject);
                );
            }
            if(edit){
                return(
                    <>
                    <div className={"size-fit p-5 bg-popover rounded-xl flex flex-col capitalize"}>
                        {Object.keys(props).map((field) => {
                            // console.log(field);
                            if(newObject[field] === undefined){
                                setNewObject({
                                    ...newObject,
                                    [field] : props[field]}
                                    //console.log(newObject);
                                );
                            }
                            if(field === "display" || field === "content" || field === "id"){
                                return;}
                            return(
                                <div className={""}>
                                    <Label
                                        className={
                                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                                        }>
                                        {field}
                                    </Label>
                                    {handleOption((typeof props[field]), field)}
                                    
                                </div>
                            );
                        })}
                        <div className={"flex flex-row flex-nowrap"}>
                        <Button
                            className={"mx-auto size-fit ml-0 p-1 mt-5 bg-red-300 self-start"}
                            onClick={() => {
                                console.log(newObject);
                                if(edit){
                                    setCustomForm([
                                        ...customForm.slice(0, newObject["id"]+1),
                                        ...customForm.slice(newObject["id"] + 2),
                                    ]);
                                    return;
                                }
                                setCustomForm([...customForm, newObject]);
                                console.log(customForm);
                            }}
                        >
                            Remove
                            <Minus
                            className={"transition-all"}
                            />
                        </Button>
                        <Button
                            className={"mx-auto size-fit mr-0 p-1 mt-5 bg-yellow-300 self-end"}
                            onClick={() => {
                                console.log(newObject);
                                if(edit){
                                    setCustomForm([
                                        ...customForm.slice(0, newObject["id"]+1),
                                        newObject,
                                        ...customForm.slice(newObject["id"] + 2),
                                    ]);
                                    return;
                                }
                                setCustomForm([...customForm, newObject]);
                                console.log(customForm);
                            }}
                        >
                            Modify
                            <Plus
                            className={"transition-all"}
                            />
                        </Button>
                        </div>
                    </div>
                </>
                );
            }else{
            return (
                <>
                    <div className={"size-fit p-5 bg-popover rounded-xl flex flex-col capitalize"}>
                        {Object.keys(props).map((field) => {
                            //console.log(field);
                            if(newObject[field] === undefined){
                                setNewObject({
                                    ...newObject,
                                    [field] : props[field]}
                                    //console.log(newObject);
                                );
                            }
                            if(field === "display" || field === "content" || field === "id"){
                                return;}
                            return(
                                <div className={""}>
                                    <Label
                                        className={
                                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                                        }>
                                        {field}
                                    </Label>
                                    {handleOption((typeof props[field]), field)}
                                    
                                </div>
                            );
                        })}
                        <Button
                            className={"mx-auto size-fit mr-0 p-1 mt-5 bg-green-300 self-end"}
                            onClick={() => {
                                console.log(newObject);
                                setCustomForm([...customForm, newObject]);
                                console.log(customForm);
                            }}
                        >
                            Add
                            <Plus
                            className={"transition-all"}
                            />
                        </Button>
                    </div>
                </>
            );
        }}
    };

    // const EditComponent = (props) => {
    //     setCurrEdit(props);
    //     const [options, setOptions] = useState([]);
    //     const [option, setOption] = useState("");
    //
    //
    //     console.log(currEdit);
    //     console.log(customForm);
    //     const handleOption = (type: string, field) => {
    //         if(type === "string"){
    //             return(
    //                 <FormInput
    //                     placeholder={field}
    //                     className={
    //                         "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
    //                     }
    //                     onChange={e => {
    //                         setCurrEdit({
    //                                 ...currEdit,
    //                                 [field] : e.target.value}
    //                             //console.log(newObject);
    //                         );
    //                     }}
    //                 />
    //             );
    //         }else if(type === "boolean"){
    //             return(
    //                 <Checkbox
    //                     onCheckedChange={checked => {
    //                         setCurrEdit({
    //                                 ...currEdit,
    //                                 [field] : checked}
    //                             //console.log(newObject);
    //                         );
    //                     }}
    //                     className={"hover:bg-accent my-auto ml-3"}
    //                 />
    //             );
    //         }else if(type === "number"){
    //             return(
    //                 <FormInput
    //                     placeholder={field}
    //                     type={"number"}
    //                     className={
    //                         "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
    //                     }
    //                     onChange={e => {
    //                         setCurrEdit({
    //                             ...currEdit,
    //                             [field] : e.target.value}
    //                         );
    //                     }}
    //                 />
    //             );
    //         }else if(type === "object"){
    //             return(
    //                 <div>
    //                     <FormInput
    //                         placeholder={field}
    //                         type={"string"}
    //                         className={
    //                             "w-fit shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
    //                         }
    //                         onChange={e => {
    //                             console.log(option);
    //                             setOption(e.target.value);
    //                         }}
    //                     />
    //                     <Button
    //                         className={"size-fit p-1 mt-5 bg-green-300 self-end"}
    //                         onClick={() => {
    //                             setOptions([...options, option]);
    //                             setCurrEdit({
    //                                 ...currEdit,
    //                                 [field] : options}
    //                             );
    //                         }}
    //                     >
    //                         <Plus
    //                             className={"transition-all"}
    //                         />
    //                     </Button>
    //                     {options.map((op) => {
    //                         return(op);
    //                     })}
    //                 </div>
    //             );
    //         }
    //         console.log("TYPE ==" + type);
    //         return;
    //     };
    //      if (!props || Object.keys(props).length === 0) {
    //          return null;
    //      }
    //      else{
    //         return (
    //                 <div className={"size-fit p-5 bg-popover rounded-xl flex flex-col"}>
    //                     {Object.keys(props).map((field) => {
    //                         console.log(field);
    //                         if(field === "display" || field === "content"){
    //                             return;}
    //                         return(
    //                             <div className={""}>
    //                                 <Label
    //                                     className={
    //                                         "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
    //                                     }>
    //                                     {field}
    //                                 </Label>
    //                                 {handleOption((typeof props[field]), field)}
    //
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //         );
    //
    //     }
    //
    //
    //
    //     // return (
    //     //     <>
    //     //         {Object.keys(props).map((key) => (
    //     //             <div className="size-16 bg-red-900" key={key}>
    //     //                 {props[key]}
    //     //             </div>
    //     //         ))}
    //     //     </>
    //     // );
    // };

    const components = {
        label: {
            display: "Form Label",
            content: "label",
            title: "",
        },
        textField: {
            display: "Text Field",
            content: "text",
            type: "",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
        },
        select: {
            display: "Select",
            content: "select",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
            label: "",
            options: [],
        },
        checkBox: {
            display: "Checkbox",
            content: "checkbox",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
        },
        radioButtons: {
            display: "Radio Buttons",
            content: "radio",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
            options: [],
        },
        locationSelector: {
            display: "Location Selector",
            content: "popover",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
        },
        employeeSelector: {
            display: "Employee Selector",
            content: "employee",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
        },
    };

    //console.log(currEdit);

    return (
        <>
            <div
                className={
                    "bg-card w-full mx-auto rounded-lg transition-all h-screen grid grid-cols-3"
                }
            >
                <div className={"py-20 col-span overflow-y-auto relative"}>
                    <div className={"bg-card w-full rounded-lg"}>
                        <div className={"m-5"}>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="flex h-10 w-50 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary">
                                        {currComponent["display"] ||
                                            "Select Field to Filter"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-80 w-fit overflow-y-auto rounded-md">
                                    {Object.keys(components).map(
                                        (option, index) => (
                                            <div
                                                key={index}
                                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap"
                                                onClick={() => {
                                                    //console.log(option);
                                                    setCurrComponent(
                                                        components[option],
                                                    );
                                                }}
                                            >
                                                {components[option]["display"]}
                                            </div>
                                        ),
                                    )}
                                </PopoverContent>
                            </Popover>
                            <div className={"transition-all p-1"}>
                            {AddField(currComponent, false)}
                            </div>
                        </div>
                        <div className={"m-5"}>
                        <Popover>
                            <PopoverTrigger>
                                <Button className="flex h-10 w-50 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary">
                                    {"Select Field to Edit/Remove"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="origin-top-left absolute max-h-80 w-fit overflow-y-auto rounded-md">
                                {customForm.map((option, index) => {
                                    return(
                                        <div
                                            key={index}
                                            className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap"
                                            onClick={() => {
                                                console.log(customForm[index - 1]);
                                                setCurrEdit(index);
                                                
                                            }}
                                        >
                                            <div className={"font-bold capitalize"}>
                                                {"ID "}
                                                {option.id}
                                                {" : "}
                                                {option.content}
                                            </div>
                                        </div>
                                    );
                                })}
                            </PopoverContent>
                        </Popover>
                        {AddField(customForm[currEdit], true)}
                            {/*{EditComponent(currEdit)}*/}
                        </div>
                    </div>
                </div>

                <div
                    className={
                        "bg-background w-full h-screen col-span-2 px-16 overflow-auto overflow-y-scroll"
                    }
                >
                    <div
                        className={
                            "bg-background py-4 relative h-fit font-bold text-center w-fit text-2xl mx-auto rounded-lg"
                        }
                    >
                        Form Preview
                    </div>
                    <div className={"mx-auto"}>
                        {ServiceRequests(customForm, {}, "", "", "")}
                    </div>
                </div>
            </div>
        </>
    );
}
