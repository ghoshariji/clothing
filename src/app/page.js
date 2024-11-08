// import Hero from '@/component/Hero'

// import React from 'react'
// import { ComplexNavbar } from './_navbar/Navbar'
// import Page from './_footer/Page'
// import HomeProduct from '@/componentProduct'
// import PopUpComponent from '@/component/PopUp'
// import Link from 'next/link'
// import { ShoppingCartIcon } from '@heroicons/react/24/solid'

// const page = () => {
//   return (  
//     <div>
//       <ComplexNavbar />
//       <Hero />
//       <Link
//           href="/cart"
//           className="fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-400 p-4 rounded-full text-white dark:text-black shadow-lg hover:bg-indigo-700 hover:dark:bg-indigo-500 transition-colors duration-300 z-50 backdrop-blur-lg bg-opacity-80"
//           style={{ zIndex: 50 }}
//         >
//           <div className="relative">
//           <ShoppingCartIcon className="h-6 w-" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
//               2
//             </span>
//           </div>
//         </Link>
//       <HomeProduct />
     
//       <Page />
//     </div>
//   )
// }

// export default page


"use client";

import Hero from '@/component/Hero';
import React, { useEffect, useState } from 'react';
import { ComplexNavbar } from './_navbar/Navbar';
import Page from './_footer/Page';
import HomeProduct from '@/component/HomeProduct';
import PopUpComponent from '@/component/PopUp';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const page = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to update cart count from localStorage
  const getCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(itemCount);
  };
  useEffect(() => {
    getCartItemCount();
    window.addEventListener("storage", getCartItemCount);
    return () => {
      window.removeEventListener("storage", getCartItemCount);
    };
  }, []);

  // Function to add product to cart (triggered from HomeProduct)
  // const addToCart = (product) => {
  //   const cart = JSON.parse(localStorage.getItem('cart')) || [];
  //   const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  //   if (existingProductIndex >= 0) {
  //     cart[existingProductIndex].quantity += 1;
      
  //   } else {
  //     cart.push({ ...product, quantity: 1 });
  //     alert("Product added to cart")
  //   }
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   getCartItemCount();
  // };


  // const addToCart = (product, quantity) => {
  //   // Retrieve the current cart from localStorage, or initialize an empty array
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   // Check if the product is already in the cart
  //   const existingProductIndex = cart.findIndex((item) => item._id === product._id);
  
  //   if (existingProductIndex > -1) {
  //     // If the product exists, update the quantity
  //     cart[existingProductIndex].quantity += quantity;
  //   } else {
  //     // If the product doesn't exist, add it to the cart with the selected quantity
  //     cart.push({ ...product, quantity });
  //   }
  
  //   // Save the updated cart back to localStorage
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };
  



  const addToCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
  
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update the cart item count
    getCartItemCount();
  };
  

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
          <ShoppingCartIcon className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </Link>
      <HomeProduct addToCart={addToCart} />
      <Page />
    </div>
  );
};

export default page;
