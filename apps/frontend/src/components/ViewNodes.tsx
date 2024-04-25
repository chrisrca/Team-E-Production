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
import {
    ArrowUpDown,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    ChevronLast,
    ChevronFirst,
    MoreHorizontal,
    BookText,
    X,
} from "lucide-react";
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
                    <div className={"flex flex-row flex-nowrap"}>
                        <Button
                            className="bg-destructive hover:bg-accent h-full w-fit self-center text-md hover:text-accent-foreground dark:text-foreground"
                            onClick={() => {
                                table.resetColumnFilters();
                            }}
                        >
                            {"Clear All"}
                        </Button>
                        <div
                            className={
                                "w-fit bg-accent ml-3 overflow-auto flex flex-row text-nowrap transition-all rounded-full border-2 border-ring"
                            }
                        >
                            <div
                                className={
                                    "font-bold flex flex-row h-full bg-card"
                                }
                            >
                                <div
                                    className={
                                        "self-center text-center pl-4 pr-2 text-md text-gray-700 dark:text-foreground"
                                    }
                                >
                                    {"Applied Filters:"}
                                </div>
                                {activeFilters.map((filter) => (
                                    <div
                                        className={
                                            "font-normal bg-accent p-1 pr-3 ml-1 ring-0 rounded-full flex flex-nowrap space-x-1 self-center"
                                        }
                                    >
                                        <Button
                                            className={
                                                "size-fit p-0 m-0 hover:bg-primary bg-destructive rounded-full self-center transition-all"
                                            }
                                            onClick={() => {
                                                table
                                                    .getColumn(filter["id"])
                                                    ?.setFilterValue("");
                                                // console.log(
                                                //     table.getColumn(filter["id"]),
                                                // );
                                                // console.log(activeFilters);
                                            }}
                                        >
                                            <X className={"size-fit"} />
                                        </Button>
                                        <div className={"font-bold text-black"}>
                                            {filter["id"] + " : "}
                                        </div>
                                        <div className={"font-normal"}>
                                            {filter["value"]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    };

    const [userPgSize, setUserPgSize] = React.useState(10);
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

    // console.log(columns);
    if (table.getState().columnFilters.length > 0) {
        for (let i = 0; i < table.getState().columnFilters.length; i++) {
            // console.log(i);
            // console.log(table.getState().columnFilters);
            // console.log(table.getState().columnFilters[i]["id"]);
            // console.log(Object.keys(data[0]));
            if (
                !Object.keys(data[0]).includes(
                    table.getState().columnFilters[i]["id"],
                )
            ) {
                table.getState().columnFilters.splice(i, 1);
            }
        }
    }

    //const [filters, setFilters] = useState("");
    if (valueFilter > Object.keys(data[0]).length) {
        setValueFilter(0);
    }

    //table.getColumn(Object.keys(data[0])[index])?.setFilterValue("");
    //console.log(Object.keys(data[0])[valueFilter]);

    if (Object.keys(data) === undefined) {
        //console.log("data.valueFilter == undefined");
        //setValueFilter(Object.keys(data[0])[0]);
    }
    //console.log((data[1]));

    return (
        <div className="w-screen p-10 overflow-auto transition-all">
            <div className="flex flex-row mb-2 space-x-2">
                <Popover>
                    <PopoverTrigger>
                        <Button className="flex h-10 w-50 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:ring-0 hover:bg-accent ring-0 text-sm text-bold font-sm text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary">
                            {"[" + Object.keys(data[0])[valueFilter] + "]" ||
                                "Select Field to Filter"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-left absolute max-h-80 w-fit overflow-y-auto rounded-md">
                        {Object.keys(data[0]).map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground"
                                onClick={() => {
                                    //console.log(option);
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
                        //console.log(table.getState().columnFilters);
                    }}
                    className="w-full transition-all hover:border-[3px] hover:border-accent focus:ring-0 bg-card"
                ></Input>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto text-accent-foreground dark:text-foreground dark:bg-accent dark:hover:bg-primary font-bold bg-primary"
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

            <div
                className={
                    "min-w-full px-4 mb-4 py-2 border rounded-lg bg-card"
                }
            >
                {renderFilters(table.getState().columnFilters)}
            </div>

            <div className="min-w-full rounded-md border overflow-x-scroll">
                <Table className={"min-w-full"}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className={"text-nowrap"}
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={
                                                "self-center text-bold py-3 bg-card"
                                            }
                                            key={header.id}
                                        >
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
                                        <TableCell
                                            className="text-start bg-secondary"
                                            key={cell.id}
                                        >
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
            <div className="flex items-center justify-end space-x-2 py-2">
                <div className={"flex-1 flex flex-row"}>
                    <div className="self-center px-4 pr-8 text-sm text-muted-foreground transition-all">
                        {"Page "}
                        {pageCount}
                        {" of "}
                        {table.getPageCount()} {"Page(s)."}
                    </div>
                    <Button
                        className={
                            "ml-2 mr-1 min-h-full w-7 p-0 self-center bg-card"
                        }
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(1);
                            table.setPageIndex(0);
                            table.setPageSize(userPgSize);
                        }}
                        disabled={!(5 < userPgSize && userPgSize < 1000)}
                    >
                        <BookText className={"size-5"} />
                    </Button>
                    <Input
                        placeholder={"#"}
                        value={userPgSize}
                        onChange={(event) => {
                            setUserPgSize(event.target.value);
                        }}
                        className="w-16 text-center transition-all hover:border-[3px] hover:border-accent focus:ring-0 bg-card"
                    ></Input>
                </div>
                <div className="transition-all flex flex-row">
                    <Button
                        className={"w-6 p-0 h-10 bg-card"}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(1);
                            table.firstPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronFirst className={"size-5"} />
                    </Button>
                    <Button
                        className={"mx-2 w-28 h-10 bg-card"}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(pageCount - 1);
                            table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className={"size-5"} />
                        Previous
                    </Button>
                    <Button
                        className={"mx-2 w-28 h-10 bg-card"}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(pageCount + 1);
                            table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                        <ChevronRight className={"size-5"} />
                    </Button>
                    <Button
                        className={"w-6 p-0 h-10 bg-card"}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPageCount(table.getPageCount());
                            table.lastPage();
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronLast className={"size-5"} />
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
                    const fixed = value.split("");
                    for (let i = 0; i < value.length; i++) {
                        if (value[i].match(/[A-Z]/) != null) {
                            fixed.splice(i, 0, " ");
                        }
                    }
                    fixed[0] = fixed[0].toUpperCase();
                    //console.log(fixed);
                    if (!value.toLowerCase().includes("id")) {
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
                                {fixed.join("")}
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
                            ).map((key, index) => {
                                const fixed = key.split("");
                                for (let i = 0; i < key.length; i++) {
                                    if (key[i].match(/[A-Z]/) != null) {
                                        fixed.splice(i, 0, " ");
                                    }
                                }
                                fixed[0] = fixed[0].toUpperCase();
                                return (
                                    <DropdownMenuItem key={index}>
                                        <div className={"font-bold"}>
                                            {fixed.join("")}
                                        </div>{" "}
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
