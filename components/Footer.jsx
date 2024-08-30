"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Footer = () => {
    const { data: session } = useSession();

  return (
    <div className='mt-5 w-full'>
                <hr className="border-gray-200 dark:border-gray-700"/>
        <footer className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white">{session?.user? "Thank You for Using I4India!" : "Join us for all the latest Global Updates"}</h1>
            
            {!session?.user && <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
                <button
                onClick={(provider) => signIn(provider.id)}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    <span>Sign in Now</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>}
        </div>
        
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
                <p className="font-semibold text-gray-800 dark:text-white">Quick Link</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</Link>
                    <Link href="/about" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">About I4India</Link>
                </div>
            </div>

            <div>
                <p className="font-semibold text-gray-800 dark:text-white">Industries</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Latest News</Link>
                    <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Popular News</Link>
                </div>
            </div>

            <div>
                <p className="font-semibold text-gray-800 dark:text-white">Categories</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href="/pages/category/general" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">General</Link>
                    <Link href="/pages/category/business" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Business</Link>
                    <Link href="/pages/category/entertainment" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Entertainment</Link>
                    <Link href="/pages/category/sports" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Sports</Link>
                    <Link href="/pages/category/science" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Science</Link>
                    <Link href="/pages/category/technology" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Technology</Link>
                    <Link href="/pages/category/education" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Education</Link>
                    <Link href="/pages/category/history" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">History</Link>

                </div>
            </div>

            <div>
                <p className="font-semibold text-gray-800 dark:text-white">Contact Us</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">+880 768 473 4978</Link>
                    <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">info@merakiui.com</Link>
                </div>
            </div>
        </div>
        
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>
        
        <div className="flex flex-col items-center justify-between sm:flex-row">
            <Link href="/">
                <img className="w-auto h-12" src="/assets/icons/i4india.png" alt="" />
            </Link>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright 2024. All Rights Reserved.</p>
        </div>
    </div>
</footer>

      

    </div>
  )
}

export default Footer