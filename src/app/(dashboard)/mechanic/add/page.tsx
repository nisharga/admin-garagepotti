import React from 'react'
import { AddVehicleForm } from './components'
import { TableSectionTitle } from '../../components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Vehicle"
        type="all"
        url="/vehicle"
      /> 
      <AddVehicleForm />
    </main>
  )
}

export default page