import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ActionButtons, StatusChangeDialog } from "../../components";
import toast from "react-hot-toast";
import { ServiceMockData, TableItem } from "@/static"; 

const status = [
    {
        id: '1',
        label: 'active',
        value: 'active'
    },
    {
        id: '2',
        label: 'inactive',
        value: 'inactive'
    }
]

const columnHelper = createColumnHelper<TableItem>();
export const useServiceTableData = ({ pageNo }: { pageNo: number | undefined }) => { 
console.log("🚀 ~ useServiceTableData ~ pageNo:", pageNo)

  const [data, setData] = useState(ServiceMockData);

  const handleDeleteFunc = (id: string) =>{
    toast.success(id) 
  }
  
  const handleUpdateStatusFunc = (id: string, status: string) =>{
    toast.success(id) 
    toast.success(status) 
  }
  const columns = useMemo(
    () => [
        columnHelper.accessor("title", {
            header: "Title",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("service", {
            header: "Service",
            cell: (info) => info.getValue(),
          }), 
          columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
              <StatusChangeDialog
                dialogData={status}
                currentStatus={info.getValue()}
                itemTitle={info.row.original.title}
                onStatusChange={(newStatus) => handleUpdateStatusFunc(info.row.original.id, newStatus)}
              />
            ),
          }),
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
              <ActionButtons 
                editUrl={`/services/edit/${info.row.original?.id}`}
                handleDelete={() => handleDeleteFunc(info.row.original?.id)}
                name={info.row.original?.id}
              />
            ),
          }),
    ],
    []
  );
 
  return { columns, data, setData };
};
