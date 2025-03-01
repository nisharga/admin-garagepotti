'use client';
import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps
} from 'next-themes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <main className='scroll-smooth' suppressHydrationWarning>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Provider>
            </main>
        </NextThemesProvider>
    );
}
