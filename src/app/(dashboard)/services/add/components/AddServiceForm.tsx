"use client" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"  
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { FormInput } from "@/app/components"
import { FormBtn } from "@/app/(dashboard)/components"
import { useCreateServiceMutation } from "@/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
 
// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).optional(), 
})

const AddServicePage = () => { 
  const router = useRouter();
  const [createService, { isLoading, isError }] = useCreateServiceMutation();


  // Initialize form with empty values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "", 
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    const response = await createService(values)
    if(response){
      router.push('/services');
      toast.success("Service created successfully")
    }    
 

    // Simulate API call
    setTimeout(() => { 
      form.reset()  
    }, 1000)
  }

  if(isError){
    return 'Something went wrong!!'
  }
  return ( 
      <Card className="bg-transparent">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
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
                  submitBtnLabel="Create"
                />
 
            </form>
          </Form>
        </CardContent>
      </Card> 
  )
}

export default AddServicePage
