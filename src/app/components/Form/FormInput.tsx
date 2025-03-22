/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: any; // React Hook Form control
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  textarea?: boolean; // If true, render a textarea
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  textarea = false,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, any> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea placeholder={placeholder} className="resize-none min-h-[120px]" {...field} />
            ) : (
              <Input type="text" placeholder={placeholder} {...field}/>
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
