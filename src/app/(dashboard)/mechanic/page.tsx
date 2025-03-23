'use client'
import { useGetAllMechanicQuery } from '@/api';
import React from 'react'

const Home = () => {
    const { data, error, isLoading } = useGetAllMechanicQuery('');
    console.log("🚀 ~ page ~ data:", data?.data)

    if (isLoading) return <p>Loading mechanics...</p>;
    if (error) return <p>Error fetching mechanics.</p>;
  return (
    <div> page</div>
  )
}

export default Home