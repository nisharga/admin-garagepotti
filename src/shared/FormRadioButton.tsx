/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    disabled?: boolean;
    dataList: any;
}

const FormRadioButton: FC<IProps> = ({
    form,
    name,
    label,
    formItemClassName,
    labelClass,
    className,
    disabled,
    dataList
}) => {
    return (
        <FormField
            disabled={disabled}
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', formItemClassName)}>
                    <FormLabel
                        className={cn(labelClass, 'font-normal text-sm')}
                    >
                        {label ? label : ''}{' '}
                        <span className='text-[#FF2E2E]'>*</span>
                    </FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={`flex flex-row items-center text-second-1050 text-sm pl-2 lg:text-base ${className}`}
                        >
                            {(dataList ?? [])?.map(
                                (val: { value: string; label: string }) => (
                                    <FormItem
                                        className='flex items-center space-x-3 space-y-0'
                                        key={val.value}
                                    >
                                        <FormControl>
                                            <RadioGroupItem
                                                value={val?.value}
                                            />
                                        </FormControl>
                                        <FormLabel className='font-normal pl-2'>
                                            {val?.label}
                                        </FormLabel>
                                    </FormItem>
                                )
                            )}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormRadioButton;
