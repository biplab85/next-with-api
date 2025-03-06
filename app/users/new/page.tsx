"use client";
import { useRouter } from 'next/navigation'
import React from 'react'

const newUserPage = () => {
  const router = useRouter();
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Programmatic Navigation</h2>
      <button
        className='rounded-md max-sm:hidden inline-block rounded-4xl bg-black px-4 py-2 text-sm/6 font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
        onClick={() => router.push('/users')}
      >
        Create new user
      </button>
    </div>
  )
}

export default newUserPage