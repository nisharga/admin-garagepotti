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
import StatusBadge from "./StatusChange"

type Status = "active" | "pending" | "completed" | "cancelled"

interface StatusChangeDialogProps {
  currentStatus: Status
  onStatusChange: (newStatus: Status) => void
  itemTitle: string
}

const StatusChangeDialog = ({ currentStatus, onStatusChange, itemTitle }: StatusChangeDialogProps) => {
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active" className="flex items-center">
                <StatusBadge status="active" className="ml-2" />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="flex items-center">
                <StatusBadge status="pending" className="ml-2" />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed" className="flex items-center">
                <StatusBadge status="completed" className="ml-2" />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cancelled" id="cancelled" />
              <Label htmlFor="cancelled" className="flex items-center">
                <StatusBadge status="cancelled" className="ml-2" />
              </Label>
            </div>
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

