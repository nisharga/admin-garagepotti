/* eslint-disable react-hooks/exhaustive-deps */
 
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
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
  const { data: mechanicData, error, isLoading } = useGetAllMechanicQuery(pageNo);  

  const [ mechanicVerifyStatus ] = useMechanicVerifyStatusMutation();

  const [data, setData] = useState<IMechanic[]>([]);
 
  useEffect(() => {
    if (!isLoading && mechanicData?.data?.data) {
      setData(mechanicData.data.data);
    }
  }, [mechanicData, isLoading]);

  const handleUpdateStatusFunc = async (id: string, status: string) => { 
    const updateData = {
      adminVerificationStatus: status, 
    };
    try { 
      const response = await mechanicVerifyStatus({id, updateData});  
      if(response){
        toast.success("Status updated successfully!");
      } 
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    } 
  };

  const handleDeleteFunc = (id: string) => {
    toast.success(`This feature is coming soon ${id}`);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("profilePic", {
        header: "Profile Picture",
        cell: (info) => (
          <Avatar 
            src={info.getValue() || "/male_avatar_two.png"} 
            className="!w-12 !h-12 !rounded-full bg-red-500"
          />
        ),
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
        cell: (info) => (
          <StatusChangeDialog
            dialogData={status}
            currentStatus={info.getValue()}
            itemTitle={info.row.original.adminVerificationStatus}
            onStatusChange={(newStatus) => handleUpdateStatusFunc(info.row.original._id, newStatus)}
          />
        ),
      }),  
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <ActionButtons 
            editUrl={`/mechanic/update/${info.row.original?._id}`}
            handleDelete={() => handleDeleteFunc(info.row.original?._id)}
            name={info.row.original?._id}
          />
        ),
      }),
    ],
    [data] // Ensure columns update when `data` changes
  );

  return { columns, data, setData, error, isLoading };
};

