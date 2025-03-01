export interface SideMenuType {
    id: number;
    name: string;
    icon: React.ReactNode;
    link: string;
}

export const sideMenu: SideMenuType[] = [
    {
        id: 1,
        name: 'dashboard',
        icon: 'Dashboard',
        link: '/dashboard'
    },
    {
        id: 3,
        name: 'mechanics',
        icon: 'SendMoney',
        link: '/mechanics'
    },
    {
        id: 5,
        name: 'car owners',
        icon: 'Recipients',
        link: '/car-owners'
    },
    {
        id: 4,
        name: 'transactions',
        icon: 'Transactions',
        link: '/user/transactions'
    },
    {
        id: 6,
        name: 'Account',
        icon: 'Account',
        link: '/user/account'
    }
];
