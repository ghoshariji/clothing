import Hero from '@/component/Hero'

import React from 'react'
import { ComplexNavbar } from './_navbar/Navbar'
import Page from './_footer/Page'
import HomeProduct from '@/component/HomeProduct'
import PopUpComponent from '@/component/PopUp'

const page = () => {
  return (
    <div>
      <ComplexNavbar />
      <Hero />
      <HomeProduct />
      {/* <PopUpComponent /> */}
      <Page />
    </div>
  )
}

export default page
