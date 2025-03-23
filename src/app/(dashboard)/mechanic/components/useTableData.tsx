/* eslint-disable @typescript-eslint/no-unused-vars */
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ActionButtons, StatusChangeDialog } from "../../components";
import toast from "react-hot-toast";
import { IMechanic } from "@/static"; 
import { useGetAllMechanicQuery, useMechanicVerifyStatusMutation } from "@/api";
import Avatar from "@/shared/Avatar";

const status = [
  {
      id: '1',
      label: 'approved',
      value: 'approved'
  },
  {
      id: '2',
      label: 'pending',
      value: 'pending'
  },
  {
      id: '3',
      label: 'rejected',
      value: 'rejected'
  }
]

const columnHelper = createColumnHelper<IMechanic>();
export const useVehicleTableData = ({ pageNo }: { pageNo: number | undefined }) => {  

  const { data: MechanicData, error, isLoading } = useGetAllMechanicQuery('');
  console.log("🚀 ~ useVehicleTableData ~ MechanicData:", MechanicData)
  const [ mechanicVerifyStatus ] = useMechanicVerifyStatusMutation(); 

  const [data, setData] = useState(MechanicData);
  
  const handleUpdateStatusFunc = async (id: string, status: string) => { 
    const payload = {
      id: id,
      status
    }
    alert(payload?.status)
    /* try {
      const res = await mechanicVerifyStatus({ ...payload });
      // toast.success("Status update successfully!") 
      console.log("🚀 ~ handleUpdateStatusFunc ~ res:", res)
    } catch (error) {
      console.error("Error updating status:", error);
    } */  
  }

  const handleDeleteFunc = (id: string) =>{
    toast.success(id) 
  }
   
  const columns = useMemo(
    () => [
        columnHelper.accessor("profilePic", {
            header: "Profile Picture",
            cell: (info) => <Avatar src={info.getValue()|| '/male_avatar_two.png'} 
            className="!w-12 !h-12 !rounded-full bg-red-500"/>,
          }),
          columnHelper.accessor("fullName", {
            header: "Full Name",
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("experienceYears", {
            header: "Experience Years",
            cell: (info) => info.getValue(),
          }),  
          columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => info.getValue(),
          }),  
          columnHelper.accessor("adminVerificationStatus", {
            header: "Verification",
            cell: (info) => <StatusChangeDialog
            dialogData={status}
            currentStatus={info.getValue()}
            itemTitle={info.row.original.adminVerificationStatus}
            onStatusChange={(newStatus) => handleUpdateStatusFunc(info.row.original._id, newStatus)}
          />,
          }),  
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
 
  return { columns, data, setData, error, isLoading };
};
