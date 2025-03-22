import React from 'react'
import { TableSectionTitle } from '../components' 
import { ServiceTable } from './components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Service"
        type="add"
        url="/services/add"
      /> 
      <ServiceTable />
    </main>
  )
}

export default page