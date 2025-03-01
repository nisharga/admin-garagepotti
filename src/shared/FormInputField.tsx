/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface IProps {
    form: any;
    name: string;
    placeholder?: any;
    label?: string;
    labelClass?: string;
    formItemClassName?: string;
    className?: string;
    defaultValue?: string;
    type?: any | 'text';
}

const FormInputField: FC<IProps> = ({
    form,
    name,
    placeholder,
    label,
    formItemClassName,
    labelClass,
    className,
    defaultValue,
    type
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', formItemClassName)}>
                    <FormLabel className={cn(labelClass, 'font-normal')}>
                        {label ? label : ''}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            value={field.value ?? defaultValue ?? ''}
                            placeholder={placeholder}
                            className={`placeholder-third-800 bg-first-300 focus-visible:ring-transparent text-white border border-white rounded-[8px]  py-4 ${className}`}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInputField;
