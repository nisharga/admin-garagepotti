"use client"  
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"  
import { Form } from "@/components/ui/form"
 import { Card, CardContent } from "@/components/ui/card" 
import { FormInput } from "@/app/components"
import { FormBtn } from "@/app/(dashboard)/components"

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Service type must be at least 2 characters.",
  }), 
})

// Default service data (in a real app, you would fetch this from an API)
const defaultService = {
  id: "1",
  title: "Website Redesign", 
  description: "Complete redesign of company website with modern UI/UX principles.", 
}

export default function EditServiceForm() { 

  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultService.title,
      description: defaultService.description, 
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    
 
    console.log("Form data:", values)
 
    
  }

  return (
    <Card className="bg-transparent">
        <CardContent className="pt-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormInput 
                    control={form.control} 
                    name="title" 
                    label="Title" 
                    placeholder="Enter service title" 
                    description="The name of your service."
                />

                <FormInput 
                    control={form.control} 
                    name="description" 
                    label="Description" 
                    placeholder="Describe the service in detail" 
                    description="Provide a detailed description of what this service includes."
                    textarea 
                /> 

                <FormBtn 
                    backURL={'/services'}
                    loading={false}
                    submitBtnLabel="Edit"
                />      
            </form>
        </Form>
        </CardContent>
    </Card>
  )
}

