import React from 'react' 
import { MechanicTable } from './components'

const page = () => {
  return (
    <main className="px-4 sm:container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold">Manage Mechanic</h1>  
      </div> 
      <MechanicTable />
    </main>
  )
}

export default page