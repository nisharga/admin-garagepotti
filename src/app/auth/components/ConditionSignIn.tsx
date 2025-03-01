import Link from 'next/link';

import { FC } from 'react';

interface IProps {
    pageName: string;
}

const ConditionSignIn: FC<IProps> = ({ pageName }) => {
    return (
        <>
            {pageName === 'register' ? (
                <div className='flex items-center justify-center gap-2'>
                    <span>—</span>
                    <div className=''>
                        <label
                            htmlFor='acceptCondition'
                            className='text-black font-medium'
                        >
                            Already a garagepotti User?
                        </label>
                        <Link
                            href='/auth/login'
                            className='text-second-550 ml-1 font-medium underline'
                        >
                            Sign in
                        </Link>
                    </div>
                    <span>—</span>
                </div>
            ) : pageName === 'login' ? (
                <div className='flex items-center justify-center gap-2'>
                    <span className='hidden sm:block'>—</span>
                    <div className='text-center'>
                        <label
                            htmlFor='acceptCondition'
                            className='text-black font-medium'
                        >
                            Do not have an account?
                        </label>
                        <Link
                            href='/auth/registration'
                            className='text-second-550 ml-1 font-medium underline'
                        >
                            Register as a User
                        </Link>
                    </div>
                    <span className='hidden sm:block'>—</span>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default ConditionSignIn;
