/* eslint-disable @typescript-eslint/no-explicit-any */
"use client" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form" 
import { FormInput } from "@/app/components"
import { useParams, useRouter } from "next/navigation"
import { useGetSingleMechanicQuery, useMechanicUpdateMutation } from "@/api"
import { useState } from "react"
import ImageUpload from "./ImageUpload"
import toast from "react-hot-toast"
import { FormBtn } from "@/app/(dashboard)/components"

// Define the form schema with validation
const formSchema = z.object({
  nid: z.string().min(1, { message: "NID is required" }),
  licenseNo: z.string().optional(),
  experienceYears: z.string().min(1, { message: "Years of experience is required" }),
  specialization: z
    .object({
      Engine: z.boolean(),
      Tire: z.boolean(),
      Battery: z.boolean(),
      Others: z.boolean(),
    })
    .refine((data) => Object.values(data).some((value) => value), {
      message: "At least one specialization is required",
      path: ["specialization"],
    }),
  workPhotos: z.any().optional(),
  bankDetails: z.object({
    accountNo: z.string().min(1, { message: "Account number is required" }),
    bankName: z.string().min(1, { message: "Bank name is required" }),
  }),
  workshopDetails: z.string().min(1, { message: "Workshop details are required" }),
})

type FormValues = z.infer<typeof formSchema>

export default function MechanicForm() {

  const [workPhotos, setWorkPhotos] = useState('');

  const params = useParams();
  const router = useRouter();
  
  const { data, error, isLoading } = useGetSingleMechanicQuery(params?.id);  

  const [mechanicUpdate] = useMechanicUpdateMutation();


  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nid: "",
      licenseNo: "",
      experienceYears: "",
      specialization: {
        Engine: true,
        Tire: false,
        Battery: false,
        Others: false,
      },
      bankDetails: {
        accountNo: "",
        bankName: "",
      },
      workshopDetails: workPhotos,
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    // Format the data to match the required JSON structure
    const formattedData = {
      nid: data.nid,
      licenseNo: data.licenseNo || "optional",
      experienceYears: data.experienceYears,
      specialization: Object.entries(data.specialization)
        .filter(([checked]) => checked)
        .map(([key]) => key),
      workPhotos: data.workPhotos?.length ? Array.from(data.workPhotos) : ["optional"],
      bankDetails: {
        accountNo: data.bankDetails.accountNo,
        bankName: data.bankDetails.bankName,
      },
      workshopDetails: data.workshopDetails,
    }

    const response = await mechanicUpdate({ id: params?.id, ...formattedData }).unwrap();
    if(response?.statusCode){
      router.push('/mechanic');
      toast.success("Mechanic Data Update Successfully!!")
    } 

  }

  if(error){
    return 'Something went wrong!!'
  }
  return (
    <Card className="bg-transparent pt-4"> 
    {
     !isLoading && data?.data?.adminVerificationStatus === 'approved' ? <div className="flex items-center justify-center min-h-[400px]">Admin Already Approved</div> : !isLoading && <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          
          <FormInput 
              control={form.control} 
              name="nid" 
              label="NID Number" 
              placeholder="Nid Number" 
              description="Nid Number match to National Id Card" 
          /> 


          <FormInput 
              control={form.control} 
              name="licenseNo" 
              label="License Number" 
              placeholder="License Number" 
              description="License Number match to Id Card" 
          /> 

          <FormInput 
              control={form.control} 
              name="experienceYears" 
              label="Years of Experience" 
              placeholder="Years of Experience" 
              description="Years of Experience Mechanic Have" 
          /> 

          {/* Specialization Fields */}
          <div className="space-y-3">
            <FormLabel>
              Specialization <span className="text-red-500">*</span>
            </FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {["Engine", "Tire", "Battery", "Others"].map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name={`specialization.${item}` as any}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            {form.formState.errors.specialization?.message && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.specialization.message}</p>
            )}
          </div>

          {/* Work Photos Field */}
          <ImageUpload setWorkPhotos={setWorkPhotos}/>

          {/* Bank Details Section */}
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="font-medium">Bank Details</h3>

            {/* Bank Account Number */}
            
          <FormInput 
              control={form.control} 
              name="bankDetails.accountNo" 
              label="Account No"
              placeholder="Account No" 
              description="Write your bank account no" 
          /> 

            {/* Bank Name */}
            
          <FormInput 
              control={form.control} 
              name="bankDetails.bankName" 
              label="Bank Name" 
              placeholder="Write Your Bank Name" 
              description="Write Your Bank Name" 
          /> 

          </div>

          
          <FormInput 
              control={form.control} 
              name="workshopDetails" 
              label="Work shop Details" 
              placeholder="Work Shop Details" 
              description="Work Shop Details" 
              textarea
          /> 

        </CardContent>
        <CardFooter className="w-full justify-end">
              <FormBtn 
                backURL={'/mechanic'}
                loading={false}
                submitBtnLabel="Submit"
              />
        </CardFooter>
      </form>
    </Form>
    }
      
    </Card>
  )
}

