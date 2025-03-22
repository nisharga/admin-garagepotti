"use client"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import StatusChangeDialog from "../../components/StatusChangeDialog"
import Link from "next/link"
import toast from "react-hot-toast"
 

// Define the data type for our table
export type TableItem = {
  id: string
  title: string
  service: string
  status: "active" | "pending" | "completed" | "cancelled"
}

// Props for our reusable table component
interface ReusableTableProps {
  data: TableItem[]
  onEdit?: (item: TableItem) => void
  onDelete?: (item: TableItem) => void
}

// Create a column helper
const columnHelper = createColumnHelper<TableItem>()

const ServiceTable = ({
  data,  
}: ReusableTableProps) => {
  // Define columns
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("service", {
      header: "Service",
      cell: (info) => info.getValue(),
    }),
    // Replace the status column definition with this:
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <StatusChangeDialog
          currentStatus={info.getValue()}
          itemTitle={info.row.original.title}
          onStatusChange={(newStatus) => { 
            toast.success(newStatus);
            // In a real app, you would update your data here
          }}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
    
        <Button variant="outline" size="icon">
            <Link href="/services/service-edit/1">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
            </Link>
        </Button>
         
           
          <Button variant="outline" size="icon" onClick={() => toast.success('deleted')}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    }),
  ]

  // Set up the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex space-x-1">
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={table.getState().pagination.pageIndex === page - 1 ? "default" : "outline"}
              size="sm"
              onClick={() => {
                table.setPageIndex(page - 1)
                console.log(`Page ${page}`)
              }}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceTable;