/* eslint-disable @typescript-eslint/no-unused-expressions */
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Icons } from '@/shared';
import { usePathname, useRouter } from 'next/navigation';
import { sideMenu } from '@/static';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Avatar from '@/shared/Avatar';

const TheSidebar = () => {
    const pathName = usePathname();
    const pathNameAbsolute = getFirstTwoSegments(pathName);
    return (
        <div className='bg-first-500 h-full rounded-r-3xl'>
            {/* desktop */}

            <div className={``}>
                <div className='w-full h-auto md:px-2 lg:px-12 lg:mb-6 mb-2 pt-6'>
                    <Avatar src={'/logo.png'} />
                </div>
                <div className='p-2'>
                    {(sideMenu ?? []).map((menu) => {
                        const IconComponent =
                            Icons[menu.icon as keyof typeof Icons]; // Dynamically select icon
                        return (
                            <Link
                                key={menu.id}
                                href={menu.link}
                                className={`!p-3 md:py-3 md:px-2 capitalize flex gap-2 items-center mb-2.5 hover:bg-white hover:rounded-full transition-all hover:text-third-500 peer group 
                  ${
                      menu.link === pathName || menu.link === pathNameAbsolute
                          ? 'bg-white rounded-full transition-all text-third-500'
                          : 'text-second-500'
                  }
                justify-center items-center md:justify-start md:items-start`}
                            >
                                <span className='p-1'>
                                    {IconComponent && (
                                        <IconComponent
                                            className={` group-hover:fill-third-500 ${
                                                menu.link == pathName ||
                                                menu.link === pathNameAbsolute
                                                    ? 'fill-third-500'
                                                    : 'fill-second-500'
                                            } `}
                                        />
                                    )}
                                </span>
                                <span className='hidden md:inline-block'>
                                    {menu.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                <div className='px-2'>{<LogOut />}</div>
            </div>
        </div>
    );
};

export default TheSidebar;

const LogOut = () => {
    const router = useRouter();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#08195E',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                typeof window !== 'undefined' ? localStorage.clear() : null;
                Cookies.remove('accessToken', { path: '/' });
                Cookies.remove('refreshToken', { path: '/' });
                Cookies.remove('name', { path: '/' });
                sessionStorage.removeItem('hasShownWelcomeToast');

                toast.success('You have successfully Logout!');
                router.push('/auth/login');
            }
        });
    };
    return (
        <button
            onClick={() => handleLogout()}
            className={`!p-3 md:py-3 md:px-2 capitalize flex gap-2 -mt-2 text-second-500 hover:bg-white hover:rounded-full transition-all hover:text-third-500 peer group justify-center items-center md:justify-start md:items-start w-full px-2`}
        >
            <span className='p-1'>
                <Icons.Logout className='fill-second-500 group-hover:fill-third-500' />
            </span>
            <span className='hidden md:inline-block'>Logout</span>
        </button>
    );
};

const getFirstTwoSegments = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    return `/${segments.slice(0, 1).join('/')}`;
};
