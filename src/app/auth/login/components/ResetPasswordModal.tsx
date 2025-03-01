/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Form } from '@/components/ui/form';
import RoundedBtn from '@/shared/RoundedBtn';
import { ResetPassword } from '@/static/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '../../components/Loading';
import { useRouter } from 'next/navigation';
import { resetPasswordSchema } from '@/schema/auth';
import FormInput from '@/shared/FormInput';
import { handleResetPassword } from '../../actions';
import toast from 'react-hot-toast';

const ResetPasswordModal = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>();

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            otp: '',
            password: '',
            confirmPassword: ''
        }
    });

    async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
        const resetPasswordPayload = {
            password: data?.password,
            code: data?.otp
        };

        try {
            setLoading(true);
            const res = await handleResetPassword(resetPasswordPayload);
            if (res.statusCode === 200) {
                router.push('/auth/login');
                toast.success('Your password has been successfully changed');
                setLoading(false);
                window.location.reload();
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
        }
    }

    const inputClass =
        '!py-5 bg-transparent border border-second-150 !rounded-[8px] placeholder:text-second-150 text-black';

    return (
        <>
            <div className='px-6 md:px-12 lg:px-28 text-center'>
                <h5 className='text-black text-xl font-bold mb-1.5'>
                    {ResetPassword?.title}
                </h5>
                <p className='text-second-900 text-sm'>
                    {ResetPassword?.subTitle}
                </p>
            </div>
            <div className='w-full flex items-center justify-center '>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-8/12'
                    >
                        <div className='mb-2'>
                            <FormInput
                                type='number'
                                label='Confirm OTP'
                                labelClass='text-black font-medium pl-1'
                                form={form}
                                name='otp'
                                placeholder='Enter your OTP'
                                className={inputClass}
                            />
                        </div>
                        <div className='mb-2'>
                            <FormInput
                                label='Password'
                                type='password'
                                labelClass='text-black font-medium pl-1'
                                form={form}
                                name='password'
                                placeholder='Choose password'
                                className={inputClass}
                            />
                        </div>
                        <div className='mb-4'>
                            <FormInput
                                label='Retype Password'
                                type='password'
                                labelClass='text-black font-medium pl-1'
                                form={form}
                                name='confirmPassword'
                                placeholder='Confirm password'
                                className={inputClass}
                            />
                        </div>

                        <div className='my-4'>
                            <RoundedBtn
                                type='submit'
                                className='py-3 w-full !flex items-center justify-center gap-3'
                            >
                                {loading ? <Loading /> : 'Submit'}
                            </RoundedBtn>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default ResetPasswordModal;
