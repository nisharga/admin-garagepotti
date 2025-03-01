/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface IProps {
    form: any;
    name: string;
    placeholder?: string;
    label?: string;
    labelClass?: string;
    formItemClassName?: string;
    className?: string;
    defaultValue?: string;
    type?: string;
}

const FormPasswordField: FC<IProps> = ({
    form,
    name,
    placeholder,
    label,
    formItemClassName,
    labelClass,
    className,
    defaultValue
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: any) => (
                <FormItem className={cn('w-full', formItemClassName)}>
                    <FormLabel
                        className={cn(
                            labelClass,
                            ' text-second-700 font-medium mb-2.5'
                        )}
                    >
                        {label ? label : ''}
                    </FormLabel>
                    <FormControl>
                        <div className='relative'>
                            <Input
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                value={field.value ?? defaultValue ?? ''}
                                placeholder={placeholder}
                                className={` placeholder-second-300 !rounded-full !bg-white focus-visible:ring-transparent border-second-300 placeholder:font-medium !pl-5 ${className}`}
                            />
                            <button
                                className='absolute right-4 top-2'
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Eye className='w-5 h-5' />
                                ) : (
                                    <EyeOff className='w-5 h-5' />
                                )}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormPasswordField;
