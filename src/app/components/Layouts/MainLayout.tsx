'use client';
import { ReactNode } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { TheSidebar } from './TheSidebar';

interface LayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
    const isNavOpen = false;
    return (
        <div>
            <div className=' bg-second-600 h-auto text-black grid grid-cols-12 font-outfit'>
                {/* Sidebar */}
                <div
                    className={`h-full transition-all duration-500 ease-in-out overflow-auto ${
                        isNavOpen
                            ? 'col-span-2 md:col-span-3 lg:col-span-2'
                            : 'col-span-2 md:col-span-3 lg:col-span-2'
                    }`}
                >
                    <TheSidebar />
                </div>

                <div
                    className={`h-screen transition-all duration-500 ease-in-out ${
                        isNavOpen
                            ? 'col-span-10 md:col-span-9 lg:col-span-10'
                            : 'col-span-10 md:col-span-9 lg:col-span-10'
                    }`}
                >
                    <div className='h-full custom-scrollbar overflow-y-auto overflow-x-hidden py-2 lg:pl-4 pl-2 pr-2'>
                        <div className='px-2 lg:px-4'>
                            <DashboardHeader />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
