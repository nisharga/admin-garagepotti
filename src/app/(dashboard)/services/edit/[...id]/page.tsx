import { TableSectionTitle } from '@/app/(dashboard)/components'
import React from 'react' 
import { EditServiceForm } from './components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Service"
        type="edit"
        url="/services"
      /> 
      <EditServiceForm />
    </main>
  )
}

export default page