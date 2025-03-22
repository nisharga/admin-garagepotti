"use client" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"  
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { FormInput } from "@/app/components"
import { FormBtn, FormSelect } from "@/app/(dashboard)/components"
import { VehicleType } from "@/static"
 
// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }), 
  model: z.string().min(3, {
    message: "Model must be at least 5 characters.",
  }), 
  type: z.string({
    required_error: "Please select a type.",
  }),
})

const AddVehicleForm = () => { 

  // Initialize form with empty values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "", 
      type: "car", 
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
   
 
    console.log("New Service Data:", values)

    // Simulate API call
    setTimeout(() => { 
      form.reset()  
    }, 1000)
  }

  return ( 
      <Card className="bg-transparent">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <FormInput 
                control={form.control} 
                name="name" 
                label="Vehicle Name" 
                placeholder="Enter Your Vehicle Name" 
                description="The name of your Vehicle"
              />

              <FormInput 
                control={form.control} 
                name="model" 
                label="Vehicle Model" 
                placeholder="Model Name" 
                description="Provide a model that specific your vehicle" 
              /> 

              <FormSelect
                name="type"
                label="Type"
                placeholder="Select a type"
                description="Current type of your vehicle"
                options={VehicleType}
                required
              />
              
              <FormBtn 
                backURL={'/vehicle'}
                loading={false}
                submitBtnLabel="Create"
              />
 
            </form>
          </Form>
        </CardContent>
      </Card> 
  )
}

export default AddVehicleForm
