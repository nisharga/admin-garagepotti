"use client"  
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"  
import { Form } from "@/components/ui/form"
 import { Card, CardContent } from "@/components/ui/card" 
import { FormInput } from "@/app/components"
import { FormBtn } from "@/app/(dashboard)/components" 
import { useGetSingleServiceQuery, useUpdateSingleServiceMutation } from "@/api"
import { useParams, useRouter } from "next/navigation" 
import { useEffect } from "react"
import toast from "react-hot-toast"

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Service type must be at least 2 characters.",
  }), 
})

 

export default function EditServiceForm() { 

const router = useRouter();
const serviceId = useParams()?.id;  


const { data, error, isLoading: isLoadingQuery } = useGetSingleServiceQuery(serviceId && serviceId[0]); 
const [ updateSingleService, { isLoading } ] = useUpdateSingleServiceMutation();

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    title: '',
    description: '', 
  },
});

// Update form values when data is available
useEffect(() => {
  if (!isLoadingQuery && data?.data) {
    form.reset({
      title: data.data.title,
      description: data.data.description,
    });
  }
}, [data, form, isLoadingQuery]);

// Handle form submission
async function onSubmit(values: z.infer<typeof formSchema>) {  
  try { 
    if (serviceId && serviceId[0]) {
      const response = await updateSingleService({
        id: serviceId[0], 
        ...values,         
      });  
  
      if (response?.data.success) {
        router.push('/services')
        toast.success("Status updated successfully!");
      } else {
        throw new Error("Failed to update");
      }
    }  
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status.");
  }  
}

if(error){
  return 'something went wrong!!'
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
                    loading={isLoading}
                    submitBtnLabel="Edit"
                />      
            </form>
        </Form>
        </CardContent>
    </Card>
  )
}

