import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      active: "bg-green-100 text-green-800 border border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      completed: "bg-blue-100 text-blue-800 border border-blue-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    },
  },
  defaultVariants: {
    variant: "active",
  },
})

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
  status: "active" | "pending" | "completed" | "cancelled"
}

const StatusBadge = ({ className, status, ...props }: StatusBadgeProps) => {
  return (
    <div className={cn(statusVariants({ variant: status }), className)} {...props}>
      <span className={`mr-1 h-1.5 w-1.5 rounded-full bg-current`} />
      <span className="capitalize">{status}</span>
    </div>
  )
}

export default StatusBadge