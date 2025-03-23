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
        id: 2,
        name: 'mechanic',
        icon: 'Account',
        link: '/mechanic'
    },
    {
        id: 3,
        name: 'services',
        icon: 'SendMoney',
        link: '/services'
    },
    {
        id: 4,
        name: 'vehicle',
        icon: 'Car',
        link: '/vehicle'
    },    
    {
        id: 5,
        name: 'trash',
        icon: 'Trash2',
        link: '/trash'
    },
    {
        id: 6,
        name: 'car owners',
        icon: 'Recipients',
        link: '/car-owners'
    },
    {
        id: 7,
        name: 'transactions',
        icon: 'Transactions',
        link: '/user/transactions'
    },
    
];
