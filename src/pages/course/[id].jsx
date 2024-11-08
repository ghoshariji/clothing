"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../app/_navbar/Navbar";
import Page from "../../app/_footer/Page";
import Authnavbar from "";
import { useRouter } from "next/router";
import Script from "next/script";
import "../../../src/app/globals.css";

const CourseDetailsPage = () => {
  const [activeSection, setActiveSection] = useState("content");
  const [name, setName] = useState("Sriteja Kataru");
  const [email, setEmail] = useState("sriteja@example.com");
  const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(null); // State to store course ID
  const [courseData, setCourseData] = useState({});
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const fetchData = async (id) => {
    try {
      const res = await fetch(`/api/getdetails?id=${id}`);
      const data = await res.json();
      console.log(data);
      setCourseData(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (router && router.query) {
      const { id } = router.query;
      if (id) {
        setCourseId(id);
        fetchData(id);
        console.log("Course ID:", id);
      }
    }
  }, [router]);

  // const courseData = {
  //   title: "What you'll learn",
  //   topics: [
  //     "Master the Fight-or-Flight Response: Learn how to use your body's natural reactions to stress to your advantage and turn stress into success.",
  //     // more topics...
  //   ],
  // };

  const courseDetails = {
    title: "The Science of Stress / Essentials of Teenage Health",
    image: "https://via.placeholder.com/800x400",
    fullDescription:
      "From Chaos to Calm: The Science of Stress and Some Stress Management Hacks for Surviving Life's Crazy Ride.",
    instructor: "Sriteja Kataru",
    duration: "59 min",
    price: "Free",
    rating: 4.4,
    students: 3941,
  };

  const createOrderId = async (price) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(price) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (amount, id) => {
    try {
      const orderId = await createOrderId(amount);
      console.log(orderId);
      const options = {
        key: "rzp_test_6Fsll3myRMs9xe", // Replace with your Razorpay Key ID
        amount: parseFloat(amount) * 100,
        currency: currency,
        name: name,
        description: "Course Purchase",
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          const paymentData = {
            courseId: id,
            userId: userId,
            orderCreationId: orderId, // Ensure you send the correct order ID
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };
          // Send payment data to your server for verification
          const res = await fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          if (res.ok) {
            alert("Payment successful");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const courseReviews = [
    {
      reviewer: "John Doe",
      comment: "Great course! Helped me a lot.",
      rating: 5,
    },
    {
      reviewer: "Jane Smith",
      comment: "Very informative and easy to follow.",
      rating: 4,
    },
    {
      reviewer: "Sam Wilson",
      comment: "Good content but could be more detailed.",
      rating: 3,
    },
  ];

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
      setUserId(data.decoded.email)
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="relative">
              <img
                src={courseData.image}
                alt={courseData.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white p-4 rounded-full shadow-lg text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-7.586V7.207c0-.552.672-.832 1.118-.512l3.33 2.293c.514.354.514 1.17 0 1.524l-3.33 2.293c-.446.32-1.118.04-1.118-.512z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {courseData.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {courseData.description}
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() =>
                    processPayment(courseData.price, courseData._id)
                  }
                >
                  Buy Course
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-6 py-3 rounded-lg shadow-md ${
                  activeSection === "content"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveSection("content")}
              >
                Course Content
              </button>
              <button
                className={`px-6 py-3 rounded-lg shadow-md ${
                  activeSection === "reviews"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveSection("reviews")}
              >
                Course Reviews
              </button>
            </div>

            {/* Conditional rendering based on selected section */}
            {activeSection === "content" && (
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                  {courseData.title}
                </h1>
                <ul className="list-none text-gray-700 space-y-4">
                  {/* {courseData.topics.map((topic, index) => (
                    <li key={index} className="mb-2 flex items-start">
                      <span className="text-green-500 font-bold text-xl mr-2">
                        ✓
                      </span>
                      <p>{topic}</p>
                    </li>
                  ))} */}
                </ul>
              </div>
            )}

            {activeSection === "reviews" && (
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                  Course Reviews
                </h1>
                {courseReviews.map((review, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border-b border-gray-200 last:border-none"
                  >
                    <p className="font-semibold text-lg text-gray-900">
                      {review.reviewer} -{" "}
                      <span className="text-yellow-500">{review.rating}★</span>
                    </p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Page />
    </>
  );
};

export default CourseDetailsPage;
