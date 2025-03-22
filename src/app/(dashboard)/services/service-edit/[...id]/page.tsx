"use client" 
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { TableSectionTitle } from "@/app/(dashboard)/components"

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  service: z.string().min(2, {
    message: "Service type must be at least 2 characters.",
  }),
  status: z.enum(["active", "pending", "completed", "cancelled"], {
    required_error: "Please select a status.",
  }),
  description: z.string().optional(),
  price: z.string().optional(),
})

// Default service data (in a real app, you would fetch this from an API)
const defaultService = {
  id: "1",
  title: "Website Redesign",
  service: "Web Development",
  status: "active" as const,
  description: "Complete redesign of company website with modern UI/UX principles.",
  price: "2500",
}

export default function ServiceEditPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultService.title,
      service: defaultService.service,
      status: defaultService.status,
      description: defaultService.description,
      price: defaultService.price,
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
 
    console.log("Form data:", values)
 
    setTimeout(() => {
      setIsSubmitting(false) 
    }, 1000)
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
    <TableSectionTitle 
        name="Service"
        type="edit"
        url="/services"
    /> 
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Service title" {...field} />
                    </FormControl>
                    <FormDescription>The name of the service you are providing.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Service type" {...field} />
                    </FormControl>
                    <FormDescription>The category of service (e.g., Web Development, Marketing).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The current status of this service.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the service" className="resize-none min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>Detailed description of what this service includes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormDescription>The price for this service.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.push("/services")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

