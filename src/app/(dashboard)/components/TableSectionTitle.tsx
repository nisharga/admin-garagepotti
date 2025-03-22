import { Button } from '@/components/ui/button'
import { ArrowLeft, SquarePlus } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const TableSectionTitle = ({name, type, url}: {name: string; type: string; url: string;}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {
        type === "edit" ? <h1 className="text-2xl font-bold">Edit {name}</h1> : 
        type === "add" ? <h1 className="text-2xl font-bold">Manage {name}</h1> :
        type === "all" ? <h1 className="text-2xl font-bold">Add New {name}</h1> : ''
      }
      {
        type === "edit" ? <Button variant="outline">
        <Link href={url} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to {name}
        </Link>
      </Button> :
      type === "add" ? <Button variant="outline">
        <Link href={url} className="flex items-center gap-2"> 
          Add {name}
          <SquarePlus className="h-4 w-4" />
        </Link>
      </Button> : 
      type === "all" ? <Button variant="outline">
      <Link href={url} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to {name}
      </Link>
    </Button> : ''
      }
    </div>
  )
}

export default TableSectionTitle