"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import Page from "../login/page";
import jwt from "jsonwebtoken"; // Assuming you have this installed
import jwt_decode from "jwt-decode"; // Correct default import
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = ({ login }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHamBurger, setShowHamBurger] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To handle token verification

  // Function to fetch the token from cookies
  // Function to fetch the token from cookies
  const getAuthToken = () => {
    // Fetch all cookies as a string
    const cookies = document.cookie;

    // Split cookies string into individual cookies
    const cookieArray = cookies.split("; ");

    // Find the authToken cookie by filtering the array
    const authToken = cookieArray.find((cookie) =>
      cookie.startsWith("authToken=")
    );

    // Extract the token value if authToken exists
    if (authToken) {
      const token = authToken.split("=")[1];
      console.log(token); // Log the token for debugging
      return token;
    }

    console.log("No authToken found");
    return null; // Return null if no authToken is found
  };

  // Function to verify the token on the client side
  const verifyToken = async () => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    console.log("Token:wdasdsa", token);
    try {
      // Send the token to the server for verification
      const res = await fetch("/api/utils", {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send the token in the request body
      });

      const data = await res.json();
      console.log(data);
      if (data.isValid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Invalid Token:", error);
      setIsAuthenticated(false);
    }
  };

  // Effect to check token on component mount
  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    setDisplay(login);
  }, [login]);

  // Handle window resizing for hamburger menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowHamBurger(true);
      } else {
        setShowHamBurger(false);
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavShow = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = () =>{
    router.push("/register")
  }

  const handleLogin = () => {
    router.push("/signin")
  };

  const closeModal = () => {
    setDisplay(false);
  };
  const router = useRouter();

  return (
    <>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-col z-40 w-full bg-black border-b border-gray-100 text-sm pb-2 sm:pb-0 bg-white-800 dark:border-gray-700">
        <nav
          className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 z-50"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a
              className="flex items-center text-xl font-semibold text-gray-900 dark:text-white"
              href="https://himachal.nic.in/en-IN/"
              aria-label="Brand"
              target="_blank"
            >
             <Image
               src="/logo.png"
              alt="Hero Background"
             // layout="fill"
             // objectFit="cover"
              //quality={100}
              height={50}
              width={100}
              className="rounded-md"
            />
              <span className="ml-3 hidden md:inline-block text-lg md:text-xl font-bold">
                AT SCHOOL. IN
              </span>
            </a>

            <div className="sm:hidden">
              <button
                type="button"
                onClick={handleNavShow}
                className="flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-white transition-all duration-300 ease-in-out"
                aria-controls="navbar-collapse-with-animation"
                aria-label="navbar-collapse-with-animation"
              >
                {isOpen ? (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden basis-full grow sm:block transition-all duration-500 ease-in-out ${
              showHamBurger
                ? isOpen
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
                : "block"
            }`}
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-5 sm:mt-0 sm:ps-7 transition-all duration-300 ease-in-out">
              
                <Link
                  className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
                  href="/"
                >
                  Home
                </Link>
         

              {/* {isAuthenticated ? (
                <Link
                  className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
                  href="/lecture"
                >
                  Lecture
                </Link>
              ) : (
                router.push("/")
              )} */}
              {/* {isAuthenticated ? (
                <Link
                  className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
                  href="/home"
                >
                  Home
                </Link>
              ) : (
                router.push("/")
              )} */}

              {/* {isAuthenticated ? (
                <Link
                  className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
                  href="/mycourse"
                >
                  My Courses
                </Link>
              ) : (
                router.push("/")
              )} */}

              <Link
                className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
                href="/about"
              >
                About us
              </Link>

{/* 
                <Link
                  href={"/settings"}
                  className="flex justify-center items-center"
                >
                  <FaGear
                    className="w-7 h-7 transition-all duration-300 ease-in-out hover:rotate-90 text-center"
                    color="white"
                  />
                </Link>
      */}

              {/* Display Login or Logout Button */}
            
                <button
                  onClick={handleLogin}
                  className="relative border flex text-lg p-2 rounded-md items-center justify-center bg-blue-500 text-white shadow-2xl transition-all hover:shadow-blue-600"
                >
                  <span className="relative z-10">Login</span>
                </button>
                <button
                  onClick={handleRegister}
                  className="relative border flex text-lg p-2 rounded-md items-center justify-center bg-blue-500 text-white shadow-2xl transition-all hover:shadow-blue-600"
                >
                  <span className="relative z-10">Register</span>
                </button>
              
            </div>
          </div>
        </nav>
      </header>
      <Page show={display} onClose={closeModal} />
    </>
  );
};

export default Navbar;
