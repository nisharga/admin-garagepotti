/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Avatar from '@/shared/Avatar';
import { getCurrentTime, getFormattedDate, getWeatherCondition } from '@/utlis';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface WeatherData {
    temperature: number;
    weathercode: number;
}

const DashboardHeader = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{
        lat: number | null;
        lon: number | null;
    }>({
        lat: null,
        lon: null
    });

    const [notificationModal, setNotificationModal] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
                },
                (error) => {
                    setError('Unable to retrieve your location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            const getWeather = async () => {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&temperature_unit=celsius`;

                try {
                    const response = await axios.get(url);
                    setWeather(response.data.current_weather);
                } catch (err) {
                    setError('Unable to fetch weather data');
                }
            };

            getWeather();
        }
    }, [location]);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !(dropdownRef.current as any).contains(event.target as Node) &&
            buttonRef.current &&
            !(buttonRef.current as any).contains(event.target as Node)
        ) {
            setNotificationModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 mt-7'>
                <div className='min-w-12 h-12 image-container'>
                    <Avatar src={'/avatar.png'} />
                </div>
                <div className='flex flex-col items-center justify-center !lg:justify-start lg:items-start'>
                    <h2 className='text-first-500 text-lg md:text-3xl font-bold'>
                        Hi Admin,
                    </h2>
                    <h3 className='text-first-500 text-xl font-normal hidden invisible lg:block lg:visible text-left'>
                        we’ve got you covered all!
                    </h3>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='hidden md:flex gap-2.5 '>
                    <div
                        className='font-medium bg-white rounded px-3 py-2 flex items-center justify-center text-third-500'
                        suppressHydrationWarning
                    >
                        {getCurrentTime()}
                    </div>
                    <div className=''>
                        <div
                            className='font-normal text-second-900'
                            suppressHydrationWarning
                        >
                            {getFormattedDate()}
                        </div>
                        <div className='font-semibold text-first-500'>
                            {getWeatherCondition(weather?.weathercode!)},{' '}
                            {weather?.temperature.toFixed(0)}℃
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
