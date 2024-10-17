"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../../../src/app/globals.css";

const CoursePage = () => {
  // Mock data for the course content
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [courseData, setCourseData] = useState({});
  // State to store course ID
  // To handle token verification
  const [selectedLecture, setSelectedLecture] = useState({
    title: "Select a lecture",
    duration: "0:00",
  });

  const router = useRouter();

  const fetchData = async (id) => {
    try {
      const res = await fetch(`/api/premCoursedetails?id=${id}`);
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

  const sections = [
    {
      title: "Section 1: Introduction to the Course",
      lectures: [
        { title: "Lecture 1: Welcome", duration: "5:00" },
        { title: "Lecture 2: Course Overview", duration: "12:30" },
      ],
    },
    {
      title: "Section 2: Getting Started with JavaScript",
      lectures: [
        { title: "Lecture 1: JavaScript Basics", duration: "15:00" },
        { title: "Lecture 2: Functions and Scope", duration: "20:10" },
      ],
    },
    // Add more sections as needed
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Video Player */}
      <div className="lg:w-3/4 bg-gray-100 p-4">
        <div
          className="relative w-full h-0"
          style={{ paddingBottom: "56.25%" }}
        >
          {/* Mock video placeholder */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{selectedLecture.title}</h1>
          <p className="text-gray-600">{selectedLecture.duration}</p>
        </div>
      </div>

      {/* Course Content List */}
      <div className="lg:w-1/4 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-2">
              {section.lectures.map((lecture, idx) => (
                <li
                  key={idx}
                  className="p-2 border rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedLecture(lecture)}
                >
                  <div className="flex justify-between">
                    <span>{lecture.title}</span>
                    <span className="text-sm text-gray-600">
                      {lecture.duration}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
