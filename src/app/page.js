import Hero from '@/component/Hero'

import React from 'react'
import { ComplexNavbar } from './_navbar/Navbar'
import Page from './_footer/Page'
import HomeProduct from '@/component/HomeProduct'
import PopUpComponent from '@/component/PopUp'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const page = () => {
  return (
    <div>
      <ComplexNavbar />
      <Hero />
      <Link
          href="/cart"
          className="fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-400 p-4 rounded-full text-white dark:text-black shadow-lg hover:bg-indigo-700 hover:dark:bg-indigo-500 transition-colors duration-300 z-50 backdrop-blur-lg bg-opacity-80"
          style={{ zIndex: 50 }}
        >
          <div className="relative">
          <ShoppingCartIcon className="h-6 w-" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
        </Link>
      <HomeProduct />
      {/* <PopUpComponent /> */}
      <Page />
    </div>
  )
}

export default page
