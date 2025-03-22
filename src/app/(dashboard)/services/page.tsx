'use client'
import { ServiceMockData } from "@/static"
import ServiceTable from "./components/ServiceTable"
import { TableSectionTitle } from "../components"


export default function ServiceTablePage() {
  return (
    <main className="container mx-auto py-10">
      <TableSectionTitle 
        name="Service"
        type="add"
        url="/services/add"
    /> 
      <ServiceTable
        data={ServiceMockData} 
        onDelete={(item) => alert(`Deleting: ${item.title}`)}
      />
    </main>
  )
}

