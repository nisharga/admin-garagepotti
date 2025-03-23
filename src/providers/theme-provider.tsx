'use client';
import { store } from '@/redux/store';
import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps
} from 'next-themes';
import { Provider } from 'react-redux';  

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <main className='scroll-smooth' suppressHydrationWarning>
                <Provider store={store}> 
                    {children} 
                </Provider>
            </main>
        </NextThemesProvider>
    );
}
