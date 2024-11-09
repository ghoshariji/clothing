// "use client";

// import React from 'react';
// import Hero from '@/component/Hero';
// import { ComplexNavbar } from './_navbar/Navbar';
// import PageFooter from './_footer/Page';
// import HomeProduct from '@/component/HomeProduct';
// import CartComponent from '@/component/CartComponent';

// const Page = () => {
//   // Define `addToCart` function and pass it down as a prop to `HomeProduct`
//   const addToCart = (product, quantity) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingProductIndex = cart.findIndex((item) => item._id === product._id);

//     if (existingProductIndex > -1) {
//       cart[existingProductIndex].quantity += quantity;
//     } else {
//       cart.push({ ...product, quantity });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     // You can also call any function here to update the cart count if necessary
//   };

//   return (
//     <div>
//       <ComplexNavbar />
//       <Hero />
//       <CartComponent />
//       <HomeProduct addToCart={addToCart} />
//       <PageFooter />
//     </div>
//   );
// };

// export default Page;


"use client";

import React, { useState, useEffect } from 'react';
import Hero from '@/component/Hero';
import { ComplexNavbar } from './_navbar/Navbar';
import PageFooter from './_footer/Page';
import HomeProduct from '@/component/HomeProduct';
import CartComponent from '@/component/CartComponent';

const Page = () => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from local storage on initial render
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };
    
    updateCartCount(); // Initial load
    window.addEventListener("storage", updateCartCount); // Listen for localStorage changes

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const addToCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Update count immediately
  };

  return (
    <div>
      <ComplexNavbar cartCount={cartCount} /> {/* Pass cartCount as prop if needed */}
      <Hero />
      <CartComponent cartCount={cartCount} /> {/* Display cart count in CartComponent */}
      <HomeProduct addToCart={addToCart} />
      <PageFooter />
    </div>
  );
};

export default Page;
