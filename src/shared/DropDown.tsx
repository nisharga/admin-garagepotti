/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

// Five Things you need to use this component
// 1. DropDown label
// 2,3. useState two values(state and setState)
// 4. selected one fields from array (if you want to show title button label then it will "title")
// 5. array data

const DropDown = ({ label, item, setItem, selectField, data }: any) => {
    // main open-close state
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='!h-[280px] w-full overflow-scroll '>
            <button
                type='button'
                onClick={() => setOpen(!open)}
                className='py-3 text-white border border-white
      flex items-center justify-between w-full rounded-[8px] px-4 mb-1'
            >
                {item ? item[selectField] : label}
                <Icons.Down_Arrow
                    className={`fill-white w-4 h-4 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <div className={open ? 'show visible' : 'hidden invisible'}>
                {(data ?? [])?.map((val: any) => (
                    <button
                        key={val?.id}
                        type='button'
                        onClick={() => {
                            setItem(val);
                            setOpen(false);
                        }}
                        className='py-3 text-white hover:text-red-500 border border-white
            flex items-center justify-between w-full rounded-[8px] px-4 mb-1 transition-all buttonHover'
                    >
                        {val ? val[selectField] : ''}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropDown;
