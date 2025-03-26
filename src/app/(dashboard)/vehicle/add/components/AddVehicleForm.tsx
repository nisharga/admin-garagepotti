"use client"

import { useState, type KeyboardEvent, type ChangeEvent } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCreateVehicleMutation } from "@/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export default function CarForm() {
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [yearInput, setYearInput] = useState("")
  const [years, setYears] = useState<string[]>([])

  const router = useRouter();
  const [createVehicle, { isLoading, isError, error }] = useCreateVehicleMutation();

  const handleYearInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setYearInput(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Add year when comma or space is pressed
    if (e.key === "," || e.key === " ") {
      e.preventDefault()
      addYear()
    }
  }

  const addYear = () => {
    if (yearInput.trim()) {
      // Add year to the list if it's not already there
      if (!years.includes(yearInput)) {
        setYears([...years, yearInput])
      }
      setYearInput("")
    }
  }

  const removeYear = (yearToRemove: string) => {
    setYears(years.filter((year) => year !== yearToRemove))
  }

  const handleSubmit = async () => {
    try {
      const data = {
        manufacturer,
        models: [
          {
            model,
            years,
          },
        ],
      };
  
      const response = await createVehicle(data).unwrap(); // Ensures error handling
  
      if (response?.success) {
        toast.success("Vehicle created successfully");
        router.push('/vehicle');
      }
    } catch (err: unknown) { 
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message || "Failed to create vehicle"; 
      toast.error(errorMessage);
      console.error("Error creating vehicle:", err);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Label htmlFor="manufacturer">Manufacturer</Label>
        <Input
          id="manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="Enter manufacturer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Enter model" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="years">Years</Label>

        {years.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {years.map((year, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
              >
                {year}
                <button
                  type="button"
                  onClick={() => removeYear(year)}
                  className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <Textarea
          id="years"
          value={yearInput}
          onChange={handleYearInputChange}
          onKeyDown={handleKeyDown}
          onBlur={addYear}
          placeholder="Enter years (numbers only, press space or comma to add)"
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">Enter numbers only. Press space or comma to add a year.</p>
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
        Submit
      </Button>

        {isError && (
    <p className="text-red-500 mt-2">
      {((error as FetchBaseQueryError)?.data as { message?: string })?.message || "Something went wrong!"}
    </p>
)}
      
    </div>
  )
}

