import React from 'react'
import { TableSectionTitle } from '../components' 
import { VehicleTable } from './components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Vehicle"
        type="add"
        url="/vehicle/add"
      /> 
      <VehicleTable />
    </main>
  )
}

export default page