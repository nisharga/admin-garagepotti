"use client"
import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  options: SelectOption[]
  required?: boolean
}

export default function FormSelect({
  name,
  label,
  placeholder = "Select an option",
  description,
  options,
  required = false,
}: FormSelectProps) {
  const form = useFormContext()

  if (!form) {
    throw new Error("FormSelect must be used within a FormProvider")
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

