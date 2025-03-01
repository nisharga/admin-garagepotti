import Avatar from '@/shared/Avatar';
import { LoginPage } from '@/static/auth';
import React from 'react';

const LoginSidebar = () => {
    return (
        <div className='bg-main-background rounded-[22px] text-main-text h-full px-8 py-16 flex flex-col justify-between'>
            <div className='mb-6'>
                <div className='text-2xl lg:text-4xl font-bold text-center mb-8 px-10'>
                    <h3 className='mb-1'>{LoginPage?.sidebar?.title}</h3>
                    <h3>{LoginPage?.sidebar?.subTitle}</h3>
                </div>
                <div className='text-center px-6'>
                    {LoginPage?.sidebar?.content}
                </div>
            </div>
            <div className='!w-full !h-auto'>
                <Avatar
                    src='/auth-image/Car.png'
                    alt='Cards'
                    className='!w-full !h-full'
                />
            </div>
        </div>
    );
};

export default LoginSidebar;
