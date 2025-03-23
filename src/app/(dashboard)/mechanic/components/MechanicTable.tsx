"use client"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender, 
} from "@tanstack/react-table" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" 
import { TablePagination } from "../../components"
import { useState } from "react"
import { useVehicleTableData } from "./useTableData"
 
const MechanicTable = () => {
  const [pageNo, setPageNo] = useState<number | undefined>(1); 
  
  const { columns, data, isLoading, error } = useVehicleTableData({pageNo}); // then pass it here
 
  

  // Set up the table
  const table = useReactTable({
    data : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  })

  if(error){
    return 'Something went wring!!'
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={header?.id === 'actions' ? 'text-right pr-12' : ''}> 
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
          {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length || 1} className="h-24 text-center">
            <div className={`animate-pulse bg-gray-300 rounded-md w-full h-6`} /> 
            </TableCell>
          </TableRow>
        ) : table?.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
        </TableRow>
      ))
) : (
  <TableRow>
    <TableCell colSpan={columns.length || 1} className="h-24 text-center">
      No results.
    </TableCell>
  </TableRow>
)}

          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <TablePagination table={table} setPageNo={setPageNo} />
      </div>
    </div>
  )
}

export default MechanicTable;