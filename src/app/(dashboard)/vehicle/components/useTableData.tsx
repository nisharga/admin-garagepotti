import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ActionButtons } from "../../components";
import toast from "react-hot-toast";
import { VehicleItem, VehicleMockData } from "@/static"; 

 

const columnHelper = createColumnHelper<VehicleItem>();
export const useVehicleTableData = ({ pageNo }: { pageNo: number | undefined }) => { 
console.log("🚀 ~ useServiceTableData ~ pageNo:", pageNo)

  const [data, setData] = useState(VehicleMockData);

  const handleDeleteFunc = (id: string) =>{
    toast.success(id) 
  }
   
  const columns = useMemo(
    () => [
        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("model", {
            header: "Model",
            cell: (info) => info.getValue(),
          }),  
          columnHelper.accessor("type", {
            header: "Type",
            cell: (info) => info.getValue(),
          }),  
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
              <ActionButtons 
                editUrl={`/vehicle/edit/${info.row.original?.id}`}
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
