import * as React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    ServiceRequests,
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
import { 
    flowerForm,
    giftForm,
    medForm,
    medicalForm,
    sanitationForm,
    roomForm,
    secForm,
    langForm,
 } from "./exampleForms";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput";
import { Plus, Minus, X } from "lucide-react";

export default function FormMaker() {
    const [customForm, setCustomForm] = useState([]);
    const [currComponent, setCurrComponent] = useState("");
    const [currEdit, setCurrEdit] = useState(-2);

    const AddField = (props, edit) => {
        const [newObject, setNewObject] = useState({});
        if (
            edit &&
            props != undefined &&
            newObject["content"] !== props["content"]
        ) {
            setNewObject(props);
        } else if (!edit && newObject["content"] !== props["content"]) {
            setNewObject(props);
        }

        if (edit) {
            props = newObject;
        }

        const [options, setOptions] = useState([]);
        const [option, setOption] = useState("");

        // console.log(newObject);
        // console.log(customForm);
        // console.log(edit.toString());
        const handleOption = (type: string, field) => {
            if (field === "type") {
                return (
                    <Select
                        onValueChange={(value) =>
                            setNewObject({
                                ...newObject,
                                [field]: value,
                            })
                        }
                    >
                        <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground">
                            <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className={"bg-card rounded-sm"}>
                                    {"Select Type"}
                                </SelectLabel>
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

            if (type === "string") {
                return (
                    <FormInput
                        placeholder={props[field]}
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                        }
                        onChange={(e) => {
                            setNewObject(
                                {
                                    ...newObject,
                                    [field]: e.target.value,
                                },
                                //console.log(newObject);
                            );
                        }}
                    />
                );
            } else if (type === "boolean") {
                return (
                    <Checkbox
                        onCheckedChange={(checked) => {
                            setNewObject(
                                {
                                    ...newObject,
                                    [field]: checked,
                                },
                                //console.log(newObject);
                            );
                        }}
                        className={"hover:bg-accent my-auto ml-5 mt-2"}
                    />
                );
            } else if (type === "number") {
                return (
                    <FormInput
                        placeholder={"Input Number"}
                        type={"number"}
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                        }
                        onChange={(e) => {
                            setNewObject({
                                ...newObject,
                                [field]: e.target.value,
                            });
                        }}
                    />
                );
            } else if (type === "object") {
                if(edit && (options.length === 0 && newObject[field] !== undefined)){
                    setOptions(newObject[field]);
                }else if(newObject[field] !== options){
                    setNewObject({
                        ...newObject,
                        [field]: options
                    });
                }
                return (
                    <div className={"bg-card rounded-lg pb-2 transition-all"}>
                    <div className={"flex flex-row flex-nowrap mb-2"}>
                        <FormInput
                            placeholder={"Input Options"}
                            type={"string"}
                            className={
                                "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0"
                            }
                            onChange={(e) => {
                                // console.log(option);
                                setOption(e.target.value);
                            }}
                        />
                        <Button
                            className={
                                "size-8 p-0 m-1 bg-green-400 hover:bg-green-500 shadow-none hover:shadow-md self-center shrink-0"
                            }
                            onClick={() => {
                                setOptions([...options, option]);
                                setNewObject({
                                    ...newObject,
                                    [field]: options,
                                });
                            }}
                        >
                            <Plus className={"transition-all"} />
                        </Button>
                    </div>
                    <div className={"mx-2 overflow-y-auto h-fit max-h-32"}>
                        {options.map((op) => {
                            return(
                                <div className={"flex flex-row flex-nowrap bg-background rounded-lg content-center p-[1px] mb-[2px]"}>
                                    <Button
                                        className={
                                            "size-5 p-0 mx-2 bg-red-400 shadow-none hover:shadow-md hover:bg-red-500 self-center rounded-full"
                                        }
                                        onClick={() => {
                                            setOptions(options.slice(0, options.indexOf(op)).concat(options.slice(options.indexOf(op) + 1)),);
                                            setNewObject({
                                                ...newObject,
                                                [field]: options
                                            });
                                            console.log(options);
                                            console.log(options.slice(0, options.indexOf(op)).concat(options.slice(options.indexOf(op) + 1)),);
                                            console.log(options.indexOf(op));
                                        }}
                                    >
                                        <X className={"transition-all"} />
                                    </Button>
                                    {op}
                                </div>
                            );
                        })}
                    </div>
                </div>
                );
            }
            // console.log("TYPE ==" + type);
            return;
        };

        if (props === "") {
            return;
        } else {
            if (newObject["content"] === undefined && !edit) {
                // console.log(newObject);
                // console.log(customForm);
                // console.log(edit.toString());
                setNewObject(
                    {
                        ...newObject,
                        content: props["content"],
                    },
                    //console.log(newObject);
                );
            }
            if (edit && currEdit > -2) {
                return (
                    <>
                        <div
                            className={
                                "size-full p-5 bg-popover rounded-xl flex flex-col capitalize"
                            }
                        >
                            {Object.keys(props).map((field) => {
                                // console.log(field);
                                if (newObject[field] === undefined) {
                                    setNewObject(
                                        {
                                            ...newObject,
                                            [field]: props[field],
                                        },
                                        //console.log(newObject);
                                    );
                                }
                                if (
                                    field === "display" ||
                                    field === "content" ||
                                    field === "id"
                                ) {
                                    return;
                                }
                                return (
                                    <div className={""}>
                                        <Label
                                            className={
                                                "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                                            }
                                        >
                                            {field}
                                        </Label>
                                        {handleOption(
                                            typeof props[field],
                                            field,
                                        )}
                                    </div>
                                );
                            })}
                            <div className={"flex flex-row flex-nowrap"}>
                                <Button
                                    className={
                                        "mx-auto size-fit ml-0 p-1 mt-5 bg-red-400 hover:bg-red-500 self-start"
                                    }
                                    onClick={() => {
                                        console.log(newObject);
                                        if (edit) {
                                            setCustomForm([
                                                ...customForm.slice(
                                                    0,
                                                    newObject["id"] + 1,
                                                ),
                                                ...customForm.slice(
                                                    newObject["id"] + 2,
                                                ),
                                            ]);
                                            return;
                                        }
                                        setCustomForm([
                                            ...customForm,
                                            newObject,
                                        ]);
                                        console.log(customForm);
                                    }}
                                >
                                    Remove
                                    <Minus className={"transition-all"} />
                                </Button>
                                <Button
                                    className={
                                        "mx-auto size-fit mr-0 p-1 mt-5 bg-yellow-400 hover:bg-yellow-500 self-end"
                                    }
                                    onClick={() => {
                                        console.log(newObject);
                                        if (edit) {
                                            setCustomForm([
                                                ...customForm.slice(
                                                    0,
                                                    newObject["id"] + 1,
                                                ),
                                                newObject,
                                                ...customForm.slice(
                                                    newObject["id"] + 2,
                                                ),
                                            ]);
                                            return;
                                        }
                                        setCustomForm([
                                            ...customForm,
                                            newObject,
                                        ]);
                                        console.log(customForm);
                                    }}
                                >
                                    Modify
                                    <Plus className={"transition-all"} />
                                </Button>
                            </div>
                        </div>
                    </>
                );
            } else if (!edit || currEdit["id"] !== undefined) {
                return (
                    <>
                        <div
                            className={
                                "size-full p-5 bg-popover rounded-xl flex flex-col capitalize"
                            }
                        >
                            {Object.keys(props).map((field) => {
                                //console.log(field);
                                if (newObject[field] === undefined) {
                                    setNewObject(
                                        {
                                            ...newObject,
                                            [field]: props[field],
                                        },
                                        //console.log(newObject);
                                    );
                                }
                                if (
                                    field === "display" ||
                                    field === "content" ||
                                    field === "id"
                                ) {
                                    return;
                                }
                                return (
                                    <div className={""}>
                                        <Label
                                            className={
                                                "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                                            }
                                        >
                                            {field}
                                        </Label>
                                        {handleOption(
                                            typeof props[field],
                                            field,
                                        )}
                                    </div>
                                );
                            })}
                            <Button
                                className={
                                    "mx-auto size-fit mr-0 p-1 mt-5 bg-green-400 hover:bg-green-500 self-end"
                                }
                                onClick={() => {
                                    console.log(newObject);
                                    setCustomForm([...customForm, newObject]);
                                    console.log(customForm);
                                }}
                            >
                                Add
                                <Plus className={"transition-all"} />
                            </Button>
                        </div>
                    </>
                );
            }
        }
    };

    const importedForms = {
        None : {
            display : "None",
            form : [],
        },
        Flower :
        {
            display : "Flower Form",
            form : flowerForm,
        },
        Gift : 
        {
            display : "Gift Form",
            form : giftForm,
        },
        Med : 
        {
            display : "Medicine Form",
            form : medForm,
        },
        Medical : 
        {
            display : "Medical Devices",
            form : medicalForm,
        },
        Sanitation : 
        {
            display : "Sanitation Form",
            form : sanitationForm,
        },
        Room : 
        {
            display : "Room Request Form",
            form : roomForm,
        },
        Security : 
        {
            display : "Security Form",
            form : secForm,
        },
        Language : 
        {
            display : "Language Form",
            form : langForm,
        },
    };

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
            id: 0,
            label: "",
            required: false,
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
            id: 0,
            required: false,
            options: [],
        },
        locationSelector: {
            display: "Location Selector",
            content: "location",
            title: "",
            id: 0,
            label: "",
            required: false,
        },
        employeeSelector: {
            display: "Employee Selector",
            content: "employee",
            title: "",
            id: 0,
            label: "",
            required: false,
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
                <div className={"py-12 col-span flex place-items-start mx-auto overflow-y-auto relative"}>
                    <div className={"bg-card w-full mx-auto rounded-lg"}>
                        <div className={"space-y-12"}>
                            <div>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="flex h-10 w-48 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary hover:text-foreground">
                                        {"Select Optional Template"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-80 w-fit overflow-y-auto rounded-m">
                                    {Object.keys(importedForms).map(
                                        (option, index) => {
                                            return(
                                                <div
                                                    key={index}
                                                    className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap"
                                                    onClick={() => {
                                                        console.log(importedForms[option]["form"]);
                                                        setCustomForm(importedForms[option]["form"]);
                                                        console.log(customForm);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        }
                                    )}
                                </PopoverContent>
                            </Popover>
                            </div>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="flex h-10 w-48 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary hover:text-foreground">
                                        {currComponent["display"] ||
                                            "Select Element to Add"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-80 w-fit overflow-y-auto rounded-m">
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
                            <div className={"transition-all p-3 w-full"}>
                                {AddField(currComponent, false)}
                            </div>
                        </div>
                        <div className={""}>
                            <Popover>
                                <PopoverTrigger>
                                    <Button
                                        className="flex h-10 w-48 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary hover:text-foreground"
                                        disabled={customForm.length < 1}
                                    >
                                        {"Select Element to Alter" ||
                                            "ID " +
                                                currEdit["id"] +
                                                " : " +
                                                currEdit["content"]}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-80 w-fit overflow-y-auto rounded-m">
                                    {customForm.map((option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap"
                                                onClick={() => {
                                                    console.log(
                                                        customForm[index],
                                                    );
                                                    setCurrEdit(index);
                                                }}
                                            >
                                                <div
                                                    className={
                                                        "font-bold capitalize flex flex-row flex-nowrap"
                                                    }
                                                >
                                                    {"ID "}
                                                    {option.id}
                                                    {": "}
                                                    <div className={"text-none"}>
                                                        {option.content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </PopoverContent>
                            </Popover>
                            <div className={"transition-all p-3 w-full"}>
                                {AddField(customForm[currEdit], true)}
                            </div>
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
