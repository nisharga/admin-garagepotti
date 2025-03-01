/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

const DropDownSearch = ({
    form,
    dataList,
    name,
    label,
    labelClass,
    notFoundText,
    className,
    type,
    setSelectedCurrency
}: any) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel className={labelClass}>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild className='!w-full'>
                            <FormControl>
                                {type === 'country' ? (
                                    <Button
                                        role='combobox'
                                        className={cn(
                                            `w-[200px] justify-between !border-none bg-second-600 !placeholder-second-900 !text-black !rounded-[8px] !py-4 lg:!py-6 !mb-4",
                      !field.value && "text-muted-foreground ${className}`
                                        )}
                                    >
                                        {field.value
                                            ? dataList?.find(
                                                  (data: any) =>
                                                      data?.country ===
                                                      field.value
                                              )?.country
                                            : `Select ${name}`}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                ) : type === 'kyc' ? (
                                    <Button
                                        role='combobox'
                                        className={cn(
                                            `w-[200px] justify-between !border-none bg-second-600 !placeholder-second-900 !text-black !rounded-[8px] !py-4 lg:!py-6 !mb-4",
                      !field.value && "text-muted-foreground`
                                        )}
                                    >
                                        {field?.value
                                            ? dataList?.find(
                                                  (data: any) =>
                                                      data?.type === field.value
                                              )?.type
                                            : `Select ${name}`}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                ) : (
                                    <Button
                                        role='combobox'
                                        className={cn(
                                            'w-[200px] justify-between !border-none bg-second-600 !placeholder-second-900 !text-black !rounded-[8px] !py-4 lg:!py-6 !mb-4',
                                            !field.value &&
                                                'text-muted-foreground'
                                        )}
                                    >
                                        {field.value
                                            ? dataList?.find(
                                                  (data: any) =>
                                                      data?.id === field.value
                                              )?.name
                                            : `Select currency`}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                )}
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                            <Command>
                                <CommandInput
                                    placeholder={`Search ${name}...`}
                                    className='h-9'
                                />
                                <CommandList>
                                    <CommandEmpty>{notFoundText}</CommandEmpty>
                                    {type === 'country' ? (
                                        <CommandGroup>
                                            {dataList?.map(
                                                (data: any, key: any) => (
                                                    <CommandItem
                                                        value={data?.country}
                                                        key={key}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                name,
                                                                data?.country
                                                            );
                                                            if (
                                                                setSelectedCurrency
                                                            ) {
                                                                setSelectedCurrency(
                                                                    data
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {data?.country}
                                                        <Check
                                                            className={cn(
                                                                'ml-auto',
                                                                data?.country ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                )
                                            )}
                                        </CommandGroup>
                                    ) : type === 'kyc' ? (
                                        <CommandGroup>
                                            {dataList?.map(
                                                (data: any, key: any) => (
                                                    <CommandItem
                                                        value={data?.id}
                                                        key={key}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                name,
                                                                data?.type
                                                            );
                                                        }}
                                                    >
                                                        {data?.type}
                                                        <Check
                                                            className={cn(
                                                                'ml-auto',
                                                                data?.type ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                )
                                            )}
                                        </CommandGroup>
                                    ) : (
                                        <CommandGroup>
                                            {dataList?.map(
                                                (data: any, key: any) => (
                                                    <CommandItem
                                                        value={data?.id}
                                                        key={key}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                name,
                                                                data?.id
                                                            );
                                                        }}
                                                    >
                                                        {data?.name}
                                                        <Check
                                                            className={cn(
                                                                'ml-auto',
                                                                data?.name ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                )
                                            )}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DropDownSearch;
