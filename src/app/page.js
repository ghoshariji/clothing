"use client";

import React from "react";
import Hero from "@/component/Hero";
import { ComplexNavbar } from "./_navbar/Navbar";
import PageFooter from "./_footer/Page";
import HomeProduct from "@/component/HomeProduct";
import CartComponent from "@/component/CartComponent";
import ReviewSlider from "@/component/Review";
import CategoryGrid from "@/component/PeopleAlsoShow";

const Page = () => {
  // Define `addToCart` function and pass it down as a prop to `HomeProduct`
  const addToCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // You can also call any function here to update the cart count if necessary
  };

  return (
    <div>
      <ComplexNavbar />
      <Hero />
      <CategoryGrid />
      <div
        className="
    fixed 
    bottom-4 right-4 
    sm:bottom-150 sm:right-200
    md:bottom-10 md:right-10 
    lg:bottom-16 lg:right-16 
    z-50
    max-w-full p-2
    overflow-hidden
  "
      >
        <CartComponent />
      </div>

      <HomeProduct addToCart={addToCart} />
      <ReviewSlider />
      <PageFooter />
    </div>
  );
};

export default Page;
