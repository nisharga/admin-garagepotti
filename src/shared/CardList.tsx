/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Icons } from './Icons';

const CardList = ({ dataArray, actionValue, setActionValue }: any) => {
    return (
        <div className='flex items-center justify-start gap-2 sm:gap-5'>
            {(dataArray ?? []).map((action: any) => {
                const IconComponent = Icons[action.icon as keyof typeof Icons]; // Dynamically select icon
                return (
                    <div
                        key={action.id}
                        onClick={() => setActionValue(action.id)}
                        className=''
                    >
                        <button
                            className={`!py-0 !px-0 capitalize gap-2 mb-2.5 hover:bg-white hover:rounded-[12px] transition-all hover:text-third-500 peer group md:justify-start md:items-start border border-white !hover:scale-0 !bg-red-300 font-medium hover:scale-105 duration-300 rounded-xl ${
                                action.id === actionValue ? 'bg-white' : ''
                            }`}
                        >
                            <div className='flex flex-col items-center justify-center p-5'>
                                {IconComponent && (
                                    <IconComponent
                                        className={` group-hover:fill-first-500  ${
                                            action.id === actionValue
                                                ? 'fill-first-500'
                                                : 'fill-white'
                                        }`}
                                    />
                                )}
                                <div
                                    className={`text-white cursor-pointer pt-2 group-hover:text-first-500 text-xs w-9 ${
                                        action.id === actionValue
                                            ? '!text-first-500'
                                            : ''
                                    }`}
                                >
                                    {action?.name}
                                </div>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default CardList;
