import React from 'react'
import { AddServiceForm } from './components'
import { TableSectionTitle } from '../../components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Service"
        type="all"
        url="/services"
      /> 
      <AddServiceForm />
    </main>
  )
}

export default page