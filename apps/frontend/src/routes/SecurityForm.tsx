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

interface Request {
    employeeName: string;
    employeeID: number;
    reqPriority: string;
    location: string;
    requestType: string;
    reqStatus: string;
    alertAuthorities: boolean;
}

export default function SecurityForm() {
    const [employeeName, setEmployeeName] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [reqPriority, setReqPriority] = useState("");
    const [location, setLocation] = useState("");
    const [requestType, setRequestType] = useState("");
    const [reqStatus, setReqStatus] = useState("");
    const [alertAuthorities, setAlertAuthorities] = useState(false);
    const [requests, setRequests] = useState<Request[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequests([
            ...requests,
            {
                employeeName,
                employeeID,
                reqPriority,
                location,
                requestType,
                reqStatus,
                alertAuthorities,
            },
        ]);
        //reset form
        setEmployeeName("");
        setEmployeeID("");
        setReqPriority("");
        setLocation("");
        setRequestType("");
        setReqStatus("");
        setAlertAuthorities(false);
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
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="flex-1">
                        <Label className="block text-sm font-medium text-gray-700">
                            Employee ID
                        </Label>
                        <Input
                            className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
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
                            value={reqPriority}
                            onValueChange={setReqPriority}
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
                            Alert Authorities
                        </Label>
                        <Checkbox
                            checked={alertAuthorities}
                            onCheckedChange={(checked) =>
                                setAlertAuthorities(checked === true)
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="mt-1 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {location || "Select Location"}
                            </Button>
                        </DropdownMenuTrigger>{" "}
                        {/* link to database */}
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <DropdownMenuItem
                                onSelect={() => setLocation("Location 1")}
                                className="dropdown-menu-item"
                            >
                                Location 1
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setLocation("Location 2")}
                                className="dropdown-menu-item"
                            >
                                Location 2
                            </DropdownMenuItem>
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
                                {requestType || "Select Type"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <DropdownMenuItem
                                onSelect={() =>
                                    setRequestType("Patient Threat")
                                }
                                className="dropdown-menu-item"
                            >
                                Patient Threat
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setRequestType("Staff Threat")}
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
                                {reqStatus || "Select Status"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <DropdownMenuItem
                                onSelect={() => setReqStatus("Unassigned")}
                                className="dropdown-menu-item"
                            >
                                Unassigned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setReqStatus("Assigned")}
                                className="dropdown-menu-item"
                            >
                                Assigned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setReqStatus("InProgress")}
                                className="dropdown-menu-item"
                            >
                                InProgress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setReqStatus("Closed")}
                                className="dropdown-menu-item"
                            >
                                Closed
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </Button>
            </form>

            <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Submitted Requests
                </h3>
                <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Employee Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Alert Authorities?
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Request Type
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Request Priority
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Request Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.employeeName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.alertAuthorities
                                            ? "Yes"
                                            : "No"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.requestType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.reqPriority}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
