/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Icons } from './Icons';

const AccordionDropDown = ({ DropDownData, recipient, setRecipient }: any) => {
    // Track the active accordion
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <>
            {DropDownData?.map((data: any) => (
                <>
                    <div
                        key={data.id}
                        className={`${data?.id !== DropDownData.length - 1 ? 'mb-4' : ''}`}
                    >
                        {/* Accordion Header */}
                        <div
                            className={`flex items-center justify-between px-5 py-2 rounded-[8px] cursor-pointer text-white text-sm 
             
              ${
                  activeId === data.id
                      ? 'bg-first-500 border border-first-500'
                      : 'border border-white'
              }
              
               ${
                   data?.id === recipient?.id
                       ? 'bg-first-500'
                       : 'bg-transparent'
               }`}
                            onClick={() => setRecipient(data)}
                        >
                            <div className='text-sm flex-item-'>
                                <span className='mr-2'>{data?.fullName}</span>
                                <span>{data?.accountNumber}</span>
                            </div>
                            <button
                                onClick={() => toggleAccordion(data.id)}
                                className='cursor-pointer'
                            >
                                {activeId === data.id ? (
                                    <Icons.ArrowBottom className='fill-white' />
                                ) : (
                                    <Icons.ArrowRight className='fill-white' />
                                )}
                            </button>
                        </div>

                        {/* Accordion Content */}
                        {activeId === data.id && (
                            <div className='text-sm bg-first-500 px-5 py-3 -mt-2 text-white rounded-md flex flex-col gap-2.5'>
                                <div className='flex items-center justify-between'>
                                    <div>Bank Name</div>
                                    <div>{data?.bankName}</div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div>Account No</div>
                                    <div>{data?.accountNumber}</div>
                                </div>
                                {/* <div className="flex items-center justify-between">
                  <div>Currency</div>
                  <div>{data?.currencyId}</div>
                </div> */}
                                <div className='flex items-center justify-between'>
                                    <div>Country</div>
                                    <div>{data?.country}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ))}
        </>
    );
};

export default AccordionDropDown;
