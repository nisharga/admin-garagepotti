import { TableSectionTitle } from '@/app/(dashboard)/components'
import React from 'react' 
import { EditForm } from './components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <TableSectionTitle 
        name="Vehicle"
        type="edit"
        url="/vehicle"
      /> 
      <EditForm />
    </main>
  )
}

export default page