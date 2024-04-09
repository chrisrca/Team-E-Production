import { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DBNode, SecurityServiceRequest } from "common/src/types";
import axios from "axios";

async function sendSecurityOrder(securityOrder: SecurityServiceRequest) {
    axios.post("/api/security", securityOrder).then((res) => {
        console.log(res);
    });
}
export default function SecurityForm({ nodes }: { nodes: DBNode[] }) {
    const [securityData, setSecurityData] = useState<SecurityServiceRequest>({
        employeeName: "",
        employeeID: 0,
        reqPriority: "",
        location: "",
        requestType: "",
        reqStatus: "",
        alertAuthorities: false,
    });

    const [requests, setRequests] = useState<SecurityServiceRequest[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            !securityData.employeeName ||
            !securityData.employeeID ||
            !securityData.reqPriority ||
            !securityData.location ||
            !securityData.requestType ||
            !securityData.reqStatus
        ) {
            alert("Please fill out all fields.");
            return; // Prevent the form from submitting
        }

        sendSecurityOrder(securityData);
        setRequests((prevRequests) => [...prevRequests, securityData]);

        //reset form
        setSecurityData({
            employeeName: "",
            employeeID: 0,
            reqPriority: "",
            location: "",
            requestType: "",
            reqStatus: "",
            alertAuthorities: false,
        });
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h1 className="text-extrabold text-center text-3xl">
                        Security Form
                    </h1>
                </div>
                <div className="flex justify-between space-x-4">
                    <div className="flex-1">
                        <Label className="block text-sm font-medium text-gray-700">
                            Name of the Employee
                        </Label>
                        <Input
                            className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={securityData.employeeName}
                            onChange={(e) =>
                                setSecurityData({
                                    ...securityData,
                                    employeeName: e.target.value,
                                })
                            }
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="flex-1">
                        <Label className="block text-sm font-medium text-gray-700">
                            Employee ID
                        </Label>
                        <Input
                            className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={securityData.employeeID}
                            onChange={(e) =>
                                setSecurityData({
                                    ...securityData,
                                    employeeID: parseInt(e.target.value),
                                })
                            }
                            placeholder="Enter your ID"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex-1 px-2">
                        <Label className="block text-sm font-medium text-gray-700">
                            Priority of the Request
                        </Label>
                        <RadioGroup
                            className="mt-1"
                            value={securityData.reqPriority}
                            onValueChange={(value) =>
                                setSecurityData({
                                    ...securityData,
                                    reqPriority: value,
                                })
                            }
                        >
                            <div className="flex space-x-4">
                                {["Low", "Medium", "High", "Emergency"].map(
                                    (priority) => (
                                        <div
                                            key={priority}
                                            className="flex items-center"
                                        >
                                            <RadioGroupItem
                                                value={priority}
                                                className="radio-group-item"
                                            />
                                            <Label className="ml-2 text-sm font-medium text-gray-700">
                                                {priority}
                                            </Label>
                                        </div>
                                    ),
                                )}
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex-1">
                        <Label className="block text-sm font-medium text-gray-700">
                            Alert Authorities?
                        </Label>
                        <Checkbox
                            checked={securityData.alertAuthorities}
                            onCheckedChange={(checked) =>
                                setSecurityData({
                                    ...securityData,
                                    alertAuthorities: checked === true,
                                })
                            }
                            className="mt-1"
                        >
                            Alert Authorities?
                        </Checkbox>
                    </div>
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">
                        Location of the Request
                    </Label>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button className="mt-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {securityData.location || "Select Location"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 max-h-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto focus:outline-none">
                            {nodes.map((node) => (
                                <DropdownMenuItem
                                    key={node.nodeID}
                                    onSelect={() =>
                                        setSecurityData({
                                            ...securityData,
                                            location: node.longName,
                                        })
                                    }
                                >
                                    {node.longName}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">
                        Type of Security Request
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="mt-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {securityData.requestType || "Select Type"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        requestType: "Patient Threat",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                Patient Threat
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        requestType: "Staff Threat",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                Staff Threat
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700">
                        Status of the Request
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="mt-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {securityData.reqStatus || "Select Status"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        reqStatus: "Unassigned",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                Unassigned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        reqStatus: "Assigned",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                Assigned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        reqStatus: "In Progress",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() =>
                                    setSecurityData({
                                        ...securityData,
                                        reqStatus: "Closed",
                                    })
                                }
                                className="dropdown-menu-item"
                            >
                                Closed
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button
                    type="submit"
                    disabled={
                        !securityData.employeeName ||
                        !securityData.employeeID ||
                        !securityData.reqPriority ||
                        !securityData.location ||
                        !securityData.requestType ||
                        !securityData.reqStatus
                    }
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </Button>
            </form>
            <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Submitted Requests
                </h3>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 break-words">
                                    Employee Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px] break-words">
                                    Employee ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[160px] break-words">
                                    Alert Authorities?
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 break-words">
                                    Request Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider break-words">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[160px] break-words">
                                    Request Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[160px] break-words">
                                    Request Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                        {request.employeeName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-words">
                                        {request.employeeID}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-words">
                                        {request.alertAuthorities
                                            ? "Yes"
                                            : "No"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                        {request.requestType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                        {request.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-words">
                                        {request.reqPriority}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-words">
                                        {request.reqStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <footer className="mt-8 text-center text-sm text-gray-500">
                Developed by Lorenzo Manfredi Segato and Kai Davidson
            </footer>
        </div>
    );
}
