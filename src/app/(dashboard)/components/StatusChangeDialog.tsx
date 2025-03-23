/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"  
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type Status = "active" | "inactive" | "approved" | "pending" | "rejected"

interface StatusChangeDialogProps {
  currentStatus: Status
  onStatusChange: (newStatus: Status) => void
  itemTitle: string
  dialogData: any;
}

const StatusChangeDialog = ({ currentStatus, onStatusChange, itemTitle, dialogData }: StatusChangeDialogProps) => {
  const [status, setStatus] = useState<Status>(currentStatus)
  const [open, setOpen] = useState(false)

  const handleStatusChange = () => {
    onStatusChange(status)
    setOpen(false)
  } 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 p-0">
          <StatusBadge status={currentStatus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>Change the status for {itemTitle}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={status}
            onValueChange={(value) => setStatus(value as Status)}
            className="flex flex-col space-y-3"
          >
            {
              (dialogData ?? []).map(({ id, label, value }: any) => (
                <div className="flex items-center space-x-2" key={id}>
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="flex items-center">
                    <StatusBadge status={label} className="ml-2" />
                  </Label>
                </div>
              ))
            } 
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleStatusChange}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StatusChangeDialog


const statusVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      active: "bg-green-100 text-green-800 border border-green-200", 
      inactive: "bg-red-100 text-red-800 border border-red-200",
      approved: "bg-green-100 text-green-800 border border-green-200", 
      pending: "bg-orange-100 text-green-800 border border-green-200", 
      rejected: "bg-red-100 text-red-800 border border-red-200",
    },
  },
  defaultVariants: {
    variant: "active",
  },
})

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
  status: any;
}

const StatusBadge = ({ className, status, ...props }: StatusBadgeProps) => {
  return (
    <div className={cn(statusVariants({ variant: status }), className)} {...props}>
      <span className={`mr-1 h-1.5 w-1.5 rounded-full bg-current`} />
      <span className="capitalize">{status}</span>
    </div>
  )
}