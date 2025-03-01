/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1440px'
            }
        },
        screens: {
            tiny: '350px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1920px'
        },
        extend: {
            backgroundImage: {},
            colors: {
                main: {
                    text: '#11181C', // Default text color
                    background: '#ffffff', // Background color
                    tint: '#0a7ea4', // Tint color for highlights
                    icon: '#687076', // Default icon color
                    tabIconDefault: '#687076', // Default tab icon color
                    tabIconSelected: '#0a7ea4', // Selected tab icon color

                    // New color categories
                    primary: '#004ABB', // Blue
                    secondary: '#D93030', // Red color
                    accent: '#E7E7E7', // gray color for border, background
                    info: '#B0B0B0', // gray color for text
                    success: '#0BAE54', // Green Color
                    warning: '#FF8510', // Orange color
                    danger: '#D93030', // Red color
                    powderBlue: '#D4F0FF', //powderBlue color
                    lightDark: '#262626', //powderBlue color
                    border: '#E7E7E7', //border color
                    subTitle: '#6D6D6D', //border color
                    gray: '#525665' //border color
                },
                first: {
                    // blue
                    100: '#8E8E8E',
                    300: '#112470',
                    500: '#08195E'
                },
                second: {
                    // gray
                    100: '#f1edec',
                    150: '#D7D7D7',
                    200: '#484848',
                    300: '#efefef',
                    400: '#CCCCCC',
                    500: '#D9D9D9',
                    550: '#08195e',
                    600: '#f5f5f5', //bg-color
                    650: '#F5F5F5',
                    700: '#E9E7E7',
                    800: '#f8fafc',
                    900: '#999999',
                    950: '#ddf0ff',
                    1000: '#3D73FF'
                },
                third: {
                    // black
                    300: '#4f5e68',
                    400: '#FF8F0F',
                    500: '#1E1E1E',
                    600: '#6b7881',
                    700: '#172937',
                    800: '#A30098',
                    900: '#ADA1FF',
                    950: '#A20EAF',
                    1000: '#A1B3FF'
                },
                fourth: {
                    50: '#BBB4FF', // card random color
                    100: '#FF8888', // card random color
                    200: '#53E068', // card random color
                    300: '#FEC15E', // card random color
                    400: '#848AA4',
                    500: '#46A3FF',
                    600: '#DFFFDD',
                    700: '#3EAE50',
                    800: '#00BE00',
                    900: '#bbb4ff',
                    950: '#3B9BFF',
                    1000: '#00AAFF',
                    1050: '#BC5A32',
                    1100: '#EA5455',
                    1150: '#96BAFD',
                    1200: '#FF9F43'
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            fontFamily: {
                outfit: ['var(--font-outfit-sans)']
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config;
