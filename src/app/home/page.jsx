// pages/home.js
"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "../../component/CourseCard";
import Navbar from "../_navbar/Navbar";
import Page from "../_footer/Page";
import Image from "next/image";
import Authnavbar from "../_navbar/AuthNavbar";
import { useRouter } from "next/navigation";
import Loader from "@/component/loader/Page";
import { faL } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [isLoading,setLoading] = useState(false)

  const [userData, setUserData] = useState(null);
  const fetchData = async () => {
    setLoading(true)
    try {
      console.log("Come");
      const res = await fetch(`/api/getcourse?userId=${userId}`);
      const data = await res.json();
      console.log(data);

      // extract the ids from the response data
      const { _id, ...userDataWithoutId } = data.userData;
      console.log(userDataWithoutId);
      setUserData(userDataWithoutId);

      // making the data into array froms
      const userCourseIds = userDataWithoutId.courses || [];
      console.log(userCourseIds);
      // filtering the values
      const filteredCourses = data.data.filter(
        (course) => !userCourseIds.includes(course._id)
      );
      setCourse(filteredCourses);
      setLoading(false)

    } catch (error) {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);

  const filteredCourses = course.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      router.push("/signin");
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
      setUserId(data.decoded.email);
      if (data.isValid) {
        return;
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log("Invalid Token:", error);
      router.push("/signin");
    }
  };

  // Effect to check token on component mount
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <Authnavbar />

      <div>
        {/* Welcome Section */}
        <section className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-500 text-white flex items-center justify-center">
                AG
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <button className="text-purple-700 hover:underline text-sm">
                  Add occupation and interests
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* Hero Section with gray theme and left-aligned text */}
        <section className="relative bg-gray-800 py-8 h-[300px] md:h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Carousel/c.jpg"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="rounded-md"
            />
          </div>

          {/* Content over the image */}
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
            {/* Limit the width to a smaller size */}
            <div className="max-w-md text-left md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Learning that gets you
              </h1>
              <p className="text-md md:text-lg text-gray-200 mb-4">
                Skills for your present (and your future). Get started with us.
              </p>
              <button className="bg-white text-gray-800 py-2 px-6 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Available Courses
          </h1>

          {isLoading ? <Loader /> : null}

          {/* Search bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search for a course..."
              className="p-2 border border-gray-300 rounded-md w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="text-center text-gray-500">No courses found</p>
            )}
          </div>
        </div>
      </div>
      <Page />
    </>
  );
};

export default HomePage;
