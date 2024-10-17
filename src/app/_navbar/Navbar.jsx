// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaGear } from "react-icons/fa6";
// import Page from "../login/page";
// import jwt from "jsonwebtoken"; // Assuming you have this installed
// import jwt_decode from "jwt-decode"; // Correct default import
// import Router from "next/navigation";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const Navbar = ({ login }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showHamBurger, setShowHamBurger] = useState(false);
//   const [display, setDisplay] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // To handle token verification

//   // Function to fetch the token from cookies
//   // Function to fetch the token from cookies
//   const getAuthToken = () => {
//     // Fetch all cookies as a string
//     const cookies = document.cookie;

//     // Split cookies string into individual cookies
//     const cookieArray = cookies.split("; ");

//     // Find the authToken cookie by filtering the array
//     const authToken = cookieArray.find((cookie) =>
//       cookie.startsWith("authToken=")
//     );

//     // Extract the token value if authToken exists
//     if (authToken) {
//       const token = authToken.split("=")[1];
//       console.log(token); // Log the token for debugging
//       return token;
//     }

//     console.log("No authToken found");
//     return null; // Return null if no authToken is found
//   };

//   // Function to verify the token on the client side
//   const verifyToken = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setIsAuthenticated(false);
//       return;
//     }

//     console.log("Token:wdasdsa", token);
//     try {
//       // Send the token to the server for verification
//       const res = await fetch("/api/utils", {
//         // Adjust the API endpoint as needed
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token }), // Send the token in the request body
//       });

//       const data = await res.json();
//       console.log(data);
//       if (data.isValid) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.log("Invalid Token:", error);
//       setIsAuthenticated(false);
//     }
//   };

//   // Effect to check token on component mount
//   useEffect(() => {
//     verifyToken();
//   }, []);

//   useEffect(() => {
//     setDisplay(login);
//   }, [login]);

//   // Handle window resizing for hamburger menu
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setShowHamBurger(true);
//       } else {
//         setShowHamBurger(false);
//         setIsOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleNavShow = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleRegister = () =>{
//     router.push("/register")
//   }

//   const handleLogin = () => {
//     router.push("/signin")
//   };

//   const closeModal = () => {
//     setDisplay(false);
//   };
//   const router = useRouter();

//   return (
//     <>
//       <header className="relative flex flex-wrap sm:justify-start sm:flex-col z-40 w-full bg-black border-b border-gray-100 text-sm pb-2 sm:pb-0 bg-white-800 dark:border-gray-700">
//         <nav
//           className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 z-50"
//           aria-label="Global"
//         >
//           <div className="flex items-center justify-between">
//             <a
//               className="flex items-center text-xl font-semibold text-gray-900 dark:text-white"
//               href="https://himachal.nic.in/en-IN/"
//               aria-label="Brand"
//               target="_blank"
//             >
//              <Image
//                src="/logo.png"
//               alt="Hero Background"
//              // layout="fill"
//              // objectFit="cover"
//               //quality={100}
//               height={50}
//               width={100}
//               className="rounded-md"
//             />
//               <span className="ml-3 hidden md:inline-block text-lg md:text-xl font-bold">
//                 AT SCHOOL. IN
//               </span>
//             </a>

//             <div className="sm:hidden">
//               <button
//                 type="button"
//                 onClick={handleNavShow}
//                 className="flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-white transition-all duration-300 ease-in-out"
//                 aria-controls="navbar-collapse-with-animation"
//                 aria-label="navbar-collapse-with-animation"
//               >
//                 {isOpen ? (
//                   <svg
//                     className="block w-6 h-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="block w-6 h-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16m-7 6h7"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div
//             className={`overflow-hidden basis-full grow sm:block transition-all duration-500 ease-in-out ${
//               showHamBurger
//                 ? isOpen
//                   ? "max-h-screen opacity-100"
//                   : "max-h-0 opacity-0"
//                 : "block"
//             }`}
//           >
//             <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-5 sm:mt-0 sm:ps-7 transition-all duration-300 ease-in-out">
              
//                 <Link
//                   className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
//                   href="/"
//                 >
//                   Home
//                 </Link>
         

//               {/* {isAuthenticated ? (
//                 <Link
//                   className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
//                   href="/lecture"
//                 >
//                   Lecture
//                 </Link>
//               ) : (
//                 router.push("/")
//               )} */}
//               {/* {isAuthenticated ? (
//                 <Link
//                   className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
//                   href="/home"
//                 >
//                   Home
//                 </Link>
//               ) : (
//                 router.push("/")
//               )} */}

//               {/* {isAuthenticated ? (
//                 <Link
//                   className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
//                   href="/mycourse"
//                 >
//                   My Courses
//                 </Link>
//               ) : (
//                 router.push("/")
//               )} */}

//               <Link
//                 className="relative text-white text-center text-lg md:text-xl hover:text-gray-300 transition-all ease-in-out"
//                 href="/about"
//               >
//                 About us
//               </Link>

// {/* 
//                 <Link
//                   href={"/settings"}
//                   className="flex justify-center items-center"
//                 >
//                   <FaGear
//                     className="w-7 h-7 transition-all duration-300 ease-in-out hover:rotate-90 text-center"
//                     color="white"
//                   />
//                 </Link>
//       */}

//               {/* Display Login or Logout Button */}
            
//                 <button
//                   onClick={handleLogin}
//                   className="relative border flex text-lg p-2 rounded-md items-center justify-center bg-blue-500 text-white shadow-2xl transition-all hover:shadow-blue-600"
//                 >
//                   <span className="relative z-10">Login</span>
//                 </button>
//                 <button
//                   onClick={handleRegister}
//                   className="relative border flex text-lg p-2 rounded-md items-center justify-center bg-blue-500 text-white shadow-2xl transition-all hover:shadow-blue-600"
//                 >
//                   <span className="relative z-10">Register</span>
//                 </button>
              
//             </div>
//           </div>
//         </nav>
//       </header>
//       <Page show={display} onClose={closeModal} />
//     </>
//   );
// };

// export default Navbar;

"use client"

import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Account",
    icon: UserCircleIcon,
  },
  {
    label: "Blocks",
    icon: CubeTransparentIcon,
  },
  {
    label: "Docs",
    icon: CodeBracketSquareIcon,
  },
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
 
        <Button size="sm" variant="text">
          <span>Log In</span>
        </Button>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}