/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { Form } from '@/components/ui/form';
import { loginSchema } from '@/schema/auth';
import FormInput from '@/shared/FormInput';
import RoundedBtn from '@/shared/RoundedBtn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod'; 
import ForgetPassModal from './ForgetPassModal'; 
import { LoadingSpinner } from '@/components/shared';
import { ACCESS_TOKEN_EXPIRY, API_BASE_URL } from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(); 
    // Define init value.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    // Define submit handler.
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${API_BASE_URL}/auth/login`,
                {
                    email: values.email,
                    password: values.password,
                    role: 'admin'
                }
            ); 
            
            if (res.status === 200) { 
                const { accessToken } = res?.data?.data
                console.log(accessToken);
                Cookies.set('token', accessToken, {
                    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
                    path: '/'
                });
                setLoading(false);
                window.location.href = '/dashboard';
                toast.success('You have successfully logged in!'); 
            } else {
                setLoading(false);
                toast.error(res?.data?.message); 
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
        }
    };

    // input class
    const inputClass =
        '!py-5 bg-transparent !text-base border border-second-150 !rounded-[8px] placeholder:text-second-150 text-black';

    return (
        <div className='relative'>
            <div className='relative'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=''
                        >
                            <div className='mb-2'>
                                <FormInput
                                    label='Email*'
                                    labelClass='text-black font-semibold pl-1 !text-base'
                                    form={form}
                                    name='email'
                                    placeholder='Enter Your Email'
                                    className={inputClass}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormInput
                                    label='Password*'
                                    type='password'
                                    labelClass='text-black font-semibold pl-1 !text-base'
                                    form={form}
                                    name='password'
                                    placeholder='Choose password'
                                    className={inputClass}
                                />
                            </div>

                            <div className='mb-4 my-10'>
                                <RoundedBtn
                                    type='submit'
                                    className='bg-first-500 rounded py-3 w-full !flex items-center justify-center gap-3
                                    '
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (
                                        <LoadingSpinner className='w-6 h-6' />
                                    ) : (
                                        'Sign In'
                                    )}
                                </RoundedBtn>
                            </div>
                            <div className='py-3'></div>
                        </form>
                    </Form>
                    <div className='mb-2 flex items-center justify-end absolute bottom-[90px] sm:bottom-[88px] right-0'>
                        <ForgetPassModal />
                    </div>
            </div>
            {/* {index === 1 && (
                <>
                    <div className='px-6 md:px-12 lg:px-24 text-center mb-4'>
                        <h5 className='text-black text-xl font-bold mb-1.5'>
                            {OTPConfirmPage.title}
                        </h5>
                        <p className='text-second-900 text-sm'>
                            {OTPConfirmPage.subTitle}
                        </p>
                    </div>
                </>
            )} */}
        </div>
    );
};

export default LoginForm;
