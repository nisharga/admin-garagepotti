 
import { Button } from '@/components/ui/button'
import { TableItem } from '@/static';
import { Table } from '@tanstack/react-table';
import React from 'react'

interface IProps {
    table: Table<TableItem>;
    setPageNo: React.Dispatch<React.SetStateAction<number | undefined>>
}

const TablePagination = ({table, setPageNo}: IProps) => {
  return (
    <div className="flex space-x-1">
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={table.getState().pagination.pageIndex === page - 1 ? "default" : "outline"}
              size="sm"
              onClick={() => {
                table.setPageIndex(page - 1)
                setPageNo(page)
              }}
            >
              {page}
            </Button>
          ))}
    </div>
  )
}

export default TablePagination