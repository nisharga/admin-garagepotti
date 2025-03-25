import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { ActionButtons, StatusChangeDialog } from "../../components";
import toast from "react-hot-toast";
import { TableItem } from "@/static"; 
import { useDeleteSingleServiceMutation, useGetAllServiceQuery, useUpdateSingleServiceMutation } from "@/api";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [data, setData] = useState([]);

  const { data: serviceData, isLoading } = useGetAllServiceQuery(pageNo); 
  const [ updateSingleService ] = useUpdateSingleServiceMutation();
  const [ deleteSingleService ] = useDeleteSingleServiceMutation();

  useEffect(() => {
    if (!isLoading && serviceData?.data?.data) {
      setData(serviceData.data.data);
    }
  }, [serviceData, isLoading]);
 

  const handleDeleteFunc = async (id: string) =>{ 
    try { 
      const response = await deleteSingleService(id);  
      if(response?.data?.success){
        toast.success("Service Deleted successfully!");
        router.push('/services')
      }   
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }  
  }
  
  const handleUpdateStatusFunc = async (id: string, status: string) =>{
     
    try { 
      const response = await updateSingleService({id, status: status});   
      if(response?.data?.success){
        toast.success("Status updated successfully!");
      }   
      
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }  
  }
  const columns = useMemo(
    () => [
        columnHelper.accessor("title", {
            header: "Title",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("description", {
            header: "Description",
            cell: (info) => info.getValue(),
          }), 
          columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
              <StatusChangeDialog
                dialogData={status}
                currentStatus={info.getValue()}
                itemTitle={info.row.original.title}
                onStatusChange={(newStatus) => handleUpdateStatusFunc(info.row.original._id, newStatus)}
              />
            ),
          }),
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
              <ActionButtons 
                editUrl={`/services/edit/${info.row.original?._id}`}
                handleDelete={() => handleDeleteFunc(info.row.original?._id)}
                name={info.row.original?._id}
              />
            ),
          }),
    ],
    []
  );
 
 
  return { columns, data, setData };
};
