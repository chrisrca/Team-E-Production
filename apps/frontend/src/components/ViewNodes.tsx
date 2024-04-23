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
import React from "react";
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
  import {  ChevronDown, MoreHorizontal } from "lucide-react";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
   
  export function DataTableDemo(data, columns) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    );
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

	const valueFilter = Object.keys(data[0])[0];
	console.log(getCoreRowModel);
   
    return (
      <div className="w-full">
        <div className="flex items-center py-4">

        <Select
                        onValueChange={(value) =>
                            (console.log(value))
                        }
                        >
                        <SelectTrigger className="flex w-40 hover:bg-secondary hover:ring-0 focus:ring-0 hover:bg-accent hover:text-background text-sm text-bold font-medium text-gray-700 dark:text-foreground">
                            <SelectValue placeholder={"Select Filter"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{""}</SelectLabel>
                                {/* Map options to select */}
                                {Object.keys(data[0]).map((option) => (
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
          <Input
            placeholder="Filter ..."
            value={(table.getColumn(valueFilter)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(valueFilter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          >
            </Input>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
		  	{} of
            {Math.round(table.getFilteredRowModel().rows.length / 10 + .5)} pages.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
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



    if(data[0] != undefined){
        Object.keys(data[0]).map((value) =>
            {
                columns.push(
                    {
                        accessorKey: value.toString(),
                        header: value
                    }
                );
            }
        );
    }

    columns.push(
        
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original;
       
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                    Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
    );

    if (data.length !== 0) {
        //const isDBNodeData = data.length > 0 && "edges" in data[0];

        return (
            <div className="relative py-10 overflow-x-auto flex flex-col items-center justify-center">
                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(data[0]).map((value, index) =>
                                isDBNodeData && value === "edges" ? null : (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        {value}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((currentValue, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                {Object.entries(currentValue).map(
                                    ([key, value], index) =>
                                        isDBNodeData &&
                                        key === "edges" ? null : isDBNodeData &&
                                          key === "blocked" &&
                                          value === false ? (
                                            <td
                                                key={index}
                                                className="px-6 py-4 text-green-500"
                                            >
                                                Unblocked
                                            </td>
                                        ) : isDBNodeData &&
                                          key === "blocked" &&
                                          value === true ? (
                                            <td
                                                key={index}
                                                className="px-6 py-4 text-red-500"
                                            >
                                                Blocked
                                            </td>
                                        ) : (
                                            <td
                                                key={index}
                                                className="px-6 py-4"
                                            >
                                                {value}
                                            </td>
                                        ),
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <div>
                {DataTableDemo(data, columns)}
                </div>
            </div>
        );
    }
}
