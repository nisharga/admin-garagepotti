/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { forgetPasswordSchema } from '@/schema/auth';
import FormInput from '@/shared/FormInput';
import { ForgetPassword } from '@/static/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '../../components/Loading';
import RoundedBtn from '@/shared/RoundedBtn';
import { handleForgetPass } from '../../actions';
import toast from 'react-hot-toast';
import ResetPasswordModal from './ResetPasswordModal';

const ForgetPassModal = () => {
    const [loading, setLoading] = useState<boolean>();

    const [step, setStep] = useState<number>(1);

    // Define init value.
    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: ''
        }
    });
    // Define submit handler.
    const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
        try {
            setLoading(true);
            const res = await handleForgetPass(values);
            if (res.statusCode === 200) {
                setStep(2);
                toast.success('Check your email for verification!');
                setLoading(false);
                form.reset();
            } else {
                toast.error(res?.message);
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className='text-sm font-medium text-second-550'>
                Forget Password?
            </DialogTrigger>
            <DialogContent className='bg-white text-second-550 !rounded-[8px]'>
                {step === 1 ? (
                    <div>
                        <div className='px-6 md:px-12 lg:px-28 text-center mb-4'>
                            <h5 className='text-black text-xl font-bold mb-1.5'>
                                {ForgetPassword?.title}
                            </h5>
                            <p className='text-second-900 text-sm'>
                                {ForgetPassword?.subTitle}
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className=''
                            >
                                <div className='mb-2'>
                                    <FormInput
                                        label='Email'
                                        labelClass='text-black font-medium pl-1'
                                        form={form}
                                        name='email'
                                        placeholder='Enter Your Email'
                                        className='!py-5 bg-transparent border border-second-150 !rounded-[8px] placeholder:text-second-150 text-black'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <RoundedBtn
                                        type='submit'
                                        className='rounded mt-2 py-3 w-full !flex items-center justify-center gap-3'
                                        disabled={loading ? true : false}
                                    >
                                        {loading ? <Loading /> : 'Send Link'}
                                    </RoundedBtn>
                                </div>
                            </form>
                        </Form>
                    </div>
                ) : step === 2 ? (
                    <>
                        <ResetPasswordModal />
                    </>
                ) : (
                    ''
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ForgetPassModal;
