import '../../styles/global.css';
import { MainLayout } from '../components';

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
