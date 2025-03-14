/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import {
    Calendar,
    Car,
    DollarSign,
    Search,
    Settings,
    PenToolIcon as Tool,
    User
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePickerWithRange } from './DatePicker';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalMechanics: 0,
        totalCarOwners: 0,
        totalCars: 0,
        totalServicesCompleted: 0,
        todayCompletedServices: 0,
        totalServiceAmount: 0,
        totalCollectableAmount: 0,
        totalPayableAmount: 0,
        withdrawRequests: 0,
        withdrawPaymentAmount: 0,
        totalFindMechanicRequests: 0
    });

    return (
        <div className='flex min-h-screen w-full flex-col'>
            <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        Dashboard
                    </h1>
                    <div className='flex items-center gap-2'>
                        <DatePickerWithRange />
                        <Button
                            variant='outline'
                            size='sm'
                            className='h-8 gap-1'
                        >
                            <Calendar className='h-3.5 w-3.5' />
                            <span className='hidden sm:inline'>
                                Filter by Date
                            </span>
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue='overview' className='space-y-4'>
                    <TabsList>
                        <TabsTrigger value='overview'>Overview</TabsTrigger>
                        <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                        <TabsTrigger value='reports'>Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value='overview' className='space-y-4'>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Mechanics
                                    </CardTitle>
                                    <Tool className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {dashboardData.totalMechanics}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Registered mechanics on the platform
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Car Owners
                                    </CardTitle>
                                    <User className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {dashboardData.totalCarOwners}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Registered car owners on the platform
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Cars
                                    </CardTitle>
                                    <Car className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {dashboardData.totalCars}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Cars added by car owners
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Services Completed
                                    </CardTitle>
                                    <Settings className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {dashboardData.totalServicesCompleted}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Successfully completed services
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Todays Completed Services
                                    </CardTitle>
                                    <Calendar className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {dashboardData.todayCompletedServices}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Services completed today
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Service Amount
                                    </CardTitle>
                                    <DollarSign className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        $
                                        {dashboardData.totalServiceAmount.toFixed(
                                            2
                                        )}
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Revenue generated from services
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Find Mechanic Requests
                                    </CardTitle>
                                    <Search className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>
                                        {
                                            dashboardData.totalFindMechanicRequests
                                        }
                                    </div>
                                    <p className='text-xs text-muted-foreground'>
                                        Times users searched for mechanics
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                            <Card className='col-span-2'>
                                <CardHeader>
                                    <CardTitle>Financial Overview</CardTitle>
                                    <CardDescription>
                                        Summary of all financial transactions
                                        and pending amounts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm font-medium text-muted-foreground'>
                                            Total Collectable Amount
                                        </span>
                                        <span className='text-2xl font-bold'>
                                            $
                                            {dashboardData.totalCollectableAmount.toFixed(
                                                2
                                            )}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Amount yet to be collected from
                                            users
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm font-medium text-muted-foreground'>
                                            Total Payable Amount
                                        </span>
                                        <span className='text-2xl font-bold'>
                                            $
                                            {dashboardData.totalPayableAmount.toFixed(
                                                2
                                            )}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Amount that needs to be paid out
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className='col-span-2'>
                                <CardHeader>
                                    <CardTitle>Withdrawal Status</CardTitle>
                                    <CardDescription>
                                        Current withdrawal requests and amounts
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm font-medium text-muted-foreground'>
                                            Withdraw Requests
                                        </span>
                                        <span className='text-2xl font-bold'>
                                            {dashboardData.withdrawRequests}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Number of withdrawal requests from
                                            mechanics
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm font-medium text-muted-foreground'>
                                            Withdraw Payment Amount
                                        </span>
                                        <span className='text-2xl font-bold'>
                                            $
                                            {dashboardData.withdrawPaymentAmount.toFixed(
                                                2
                                            )}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            Total amount requested for
                                            withdrawal
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value='analytics' className='space-y-4'>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                            <Card className='col-span-4'>
                                <CardHeader>
                                    <CardTitle>User Growth</CardTitle>
                                    <CardDescription>
                                        Monthly growth of mechanics and car
                                        owners
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='h-[300px] flex items-center justify-center'>
                                    <p className='text-muted-foreground'>
                                        Analytics charts will appear here
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className='col-span-3'>
                                <CardHeader>
                                    <CardTitle>Service Distribution</CardTitle>
                                    <CardDescription>
                                        Types of services requested
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='h-[300px] flex items-center justify-center'>
                                    <p className='text-muted-foreground'>
                                        Service distribution chart will appear
                                        here
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value='reports' className='space-y-4'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Reports</CardTitle>
                                <CardDescription>
                                    Generate and download reports
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='h-[400px] flex items-center justify-center'>
                                <p className='text-muted-foreground'>
                                    Report generation tools will appear here
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
