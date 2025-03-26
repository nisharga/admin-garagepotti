import { createColumnHelper, Row } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { ActionButtons } from "../../components";
import toast from "react-hot-toast";
import { VehicleItem } from "@/static"; 
import { useGetAllVehicleQuery } from "@/api"; 

 

const columnHelper = createColumnHelper<VehicleItem>();
export const useVehicleTableData = ({ pageNo }: { pageNo: number | undefined }) => { 

 const { data: vehicleData, isLoading, isError, error } = useGetAllVehicleQuery(pageNo);
 console.log("🚀 ~ useVehicleTableData ~ vehicleData:", vehicleData?.data)

 const [data, setData] = useState<VehicleItem[]>([]); 
 useEffect(() => {
  if (Array.isArray(vehicleData?.data)) {
    setData(vehicleData.data);
  }
}, [vehicleData]);


  const handleDeleteFunc = (id: string) =>{
    toast.success(id) 
  }
   

  const columns = useMemo(
    () => [
          columnHelper.accessor("manufacturer", {
            header: "Manufacturer",
            cell: (info) => <span className="font-semibold text-lg">{info.getValue()}</span>,
          }),
          {
            accessorKey: "models",
            header: "Models",
            cell: ({ row }: { row: Row<VehicleItem> }) => (
              <div>
            {/* Safe check for models to ensure it's an array */}
            {Array.isArray(row.original.models) && row.original.models.length > 0 ? (
              row.original.models.map((model, idx) => (
                <div key={idx} className="mb-2">
                  <span className="font-semibold">{model.model}:</span>{" "}
                  <span className="text-gray-600">{model.years.join(", ")}</span>
                </div>
              ))
            ) : (
              <p>No models available</p> 
            )}
          </div>
            ),
          },
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => (
              <ActionButtons 
                editUrl={`/vehicle/edit/${info.row.original?._id}`}
                handleDelete={() => handleDeleteFunc(info.row.original?._id)}
                name={info.row.original?._id}
              />
            ),
          }),
    ],
    []
  );
 

  return { columns, data, setData, isLoading, isError, error };
};
 