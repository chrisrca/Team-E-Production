import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ViewNodes } from "@/components";
import { Button } from "@/components/ui/button";
//import { Checkbox } from "@/components/ui/checkbox";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown, ChevronDown, MoreHorizontal, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    //DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DBNode,
    Edge,
    FlowerServiceRequest,
    GiftServiceRequest,
    InterpreterServiceRequest,
    SecurityServiceRequest,
    DrugDeliveryData,
    SanitationServiceRequest,
    RoomSchedulingForm,
    MedicalDeviceServiceRequest,
} from "common/src/types";

export function DataTableDemo(data, columns) {
    const renderFilters = (activeFilters) => {
        if (activeFilters.length === 0) {
            return "No Active Filters.";
        } else {
            return (
                <>
                    <Button className="bg-accent size-4">hi</Button>
                    <div className={"min-w-full overflow-auto bg-accent"}>
                        <div className={"font-bold flex flex-nowrap"}>
                            {"Applied Filters:"}
                            {activeFilters.map((filter) => (
                                <div
                                    className={
                                        "font-normal p-2 border rounded-xl flex flex-nowrap"
                                    }
                                >
                                    <Button
                                        className={
                                            "size-fit p-0 m-0 hover:bg-accent"
                                        }
                                        onClick={() => {
                                            table
                                                .getColumn(filter["id"])
                                                ?.setFilterValue("");
                                            console.log(
                                                table.getColumn(filter["id"]),
                                            );
                                            console.log(activeFilters);
                                        }}
                                    >
                                        <X className={"size-fit"} />
                                    </Button>
                                    {filter["id"] + " : " + filter["value"]}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            );
        }
    };

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const [pageCount, setPageCount] = useState(1);
    //const [pageMax, setPageMax] = useState(1);

    const filter = 0;
    const [valueFilter, setValueFilter] = useState(filter);

    console.log(columns);
    if (table.getState().columnFilters.length > 0) {
        for (let i = 0; i < table.getState().columnFilters.length; i++) {
            console.log(i);
            console.log(table.getState().columnFilters);
            console.log(table.getState().columnFilters[i]["id"]);
            console.log(Object.keys(data[0]));
            if (
                !Object.keys(data[0]).includes(
                    table.getState().columnFilters[i]["id"],
                )
            ) {
                console.log("pop!");

                table.getState().columnFilters.splice(i, 1);
            } else {
                console.log("no pop!");
            }
        }
    }

    //const [filters, setFilters] = useState("");
    if (valueFilter > Object.keys(data[0]).length) {
        setValueFilter(0);
    }
    if (Object.keys(data[0])[valueFilter] === undefined) {
        setValueFilter(0);
        Object.keys(data[0]).map((key) => {
            table.getColumn(Object.keys(data[0])[key])?.setFilterValue("");
        });
    }

    //table.getColumn(Object.keys(data[0])[index])?.setFilterValue("");
    console.log(Object.keys(data[0])[valueFilter]);

    if (Object.keys(data) === undefined) {
        console.log("data.valueFilter == undefined");
        //setValueFilter(Object.keys(data[0])[0]);
    }
    //const filter = Object.keys(data[0])[0];

    return (
        <div className="w-screen p-10 overflow-auto">
            <div className="flex flex-row mb-2 space-x-2">
                <Popover>
                    <PopoverTrigger>
                        <Button className="flex h-10 w-50 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent hover:text-accent-foreground ring-0 text-sm text-bold font-sm text-gray-700 dark:text-foreground">
                            {"Select Field to Filter"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-left absolute max-h-80 w-fit overflow-y-auto rounded-md shadow-lg">
                        {Object.keys(data[0]).map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-accent hover-text cursor-pointer rounded-md hover:text-accent-foreground"
                                onClick={() => {
                                    console.log(option);
                                    setValueFilter(index);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
                <Input
                    placeholder={
                        "Filter by [" +
                        Object.keys(data[0])[valueFilter] +
                        "] field... "
                    }
                    value={
                        (table
                            .getColumn(Object.keys(data[0])[valueFilter])
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) => {
                        table
                            .getColumn(Object.keys(data[0])[valueFilter])
                            ?.setFilterValue(event.target.value);
                        console.log(table.getState().columnFilters);
                    }}
                    className="w-full hover:ring-0 focus:ring-0"
                ></Input>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto text-gray-700"
                        >
                            Display Fields{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className={"min-w-full px-4 mb-4 p-2 border rounded-lg"}>
                {renderFilters(table.getState().columnFilters)}
            </div>

            <div className="min-w-full rounded-md border">
                <Table className={"min-w-full"}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {"Page "}
                    {pageCount}
                    {" of "}
                    {Math.round(
                        table.getFilteredRowModel().rows.length / 10 + 0.4,
                    )}{" "}
                    {"Page(s)."}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(pageCount - 1);
                            table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(pageCount + 1);
                            table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function ViewNodes(inputData: {
    data:
        | Edge[]
        | DBNode[]
        | FlowerServiceRequest[]
        | GiftServiceRequest[]
        | InterpreterServiceRequest[]
        | SecurityServiceRequest[]
        | DrugDeliveryData[]
        | SanitationServiceRequest[]
        | RoomSchedulingForm[]
        | MedicalDeviceServiceRequest[];
}) {
    const columns = [];

    const data = inputData.data;

    if (data[0] != undefined) {
        Object.keys(data[0]).map((value) => {
            if (value.includes("flower")) {
                return;
            }
            columns.push({
                accessorKey: value,
                header: ({ column }) => {
                    if (!value.toLowerCase().includes("id")) {
                        const fixed = value.split("");
                        for (let i = 0; i < value.length; i++) {
                            if (value[i].match(/[A-Z]/) != null) {
                                fixed.splice(i, 0, " ");
                            }
                        }
                        fixed[0] = fixed[0].toUpperCase();
                        //console.log(fixed);
                        return fixed.join("");
                    } else {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    column.toggleSorting(
                                        column.getIsSorted() === "asc",
                                    )
                                }
                            >
                                {value}
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        );
                    }
                },
            });
        });
    }

    if (
        data[0] != undefined &&
        !(Object.keys(data[0]).indexOf("serviceType") === -1)
    ) {
        columns.push({
            id: "actions",
            enableHiding: false,
            header: "Details",
            cell: ({ row }) => {
                const details = row.original;

                //console.log(row);
                const order = details[details["serviceType"].toLowerCase()];
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Order Details</DropdownMenuLabel>
                            {Object.keys(
                                details[details["serviceType"].toLowerCase()],
                            ).map((key) => {
                                return (
                                    <DropdownMenuItem>
                                        <div className={"font-bold"}>{key}</div>{" "}
                                        : {order[key]}
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        });
    }
    if (data.length !== 0) {
        //const isDBNodeData = data.length > 0 && "edges" in data[0];

        return (
            <div className="py-10 mx-2 overflow-x-auto flex flex-col items-center justify-center min-w-full">
                <div className="w-full">{DataTableDemo(data, columns)}</div>
            </div>
        );
    }
}
