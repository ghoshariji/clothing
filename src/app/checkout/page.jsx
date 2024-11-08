"use client";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import Footer from './_footer/Page';
import { ComplexNavbar } from "../_navbar/Navbar";
// import Razorpay from "razorpay";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [file, setFile] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     if (paymentMethod === "onlinePayment") {
  //       // Razorpay integration
  //       const options = {
  //         key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay key ID
  //         amount: 50000, // Amount in paise (50000 = 500 INR)
  //         currency: "INR",
  //         name: "Your Company Name",
  //         description: "Order Payment",
  //         handler: function (response) {
  //           alert("Payment successful: " + response.razorpay_payment_id);
  //         },
  //         prefill: {
  //           name: "Customer Name",
  //           email: "customer@example.com",
  //           contact: "9876543210",
  //         },
  //       };
  //       const rzp = new Razorpay(options);
  //       rzp.open();
  //     } else {
  //       alert("Order confirmed with Cash on Delivery");
  //     }
  //   };

  const handleSubmit = () => {};
  return (
    <>
      <ComplexNavbar />
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Complete Your Order</h2>

      {/* Personal Information */}
      <div className="space-y-6 border-b border-gray-300 pb-6">
        <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="last-name"
              name="last-name"
              type="text"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
            Upload Document
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="mt-2 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-6 border-b border-gray-300 py-6">
        <h3 className="text-xl font-semibold text-gray-700">Payment Method</h3>
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={() => handlePaymentMethodChange("cashOnDelivery")}
              className="text-indigo-600 focus:ring-indigo-600"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Cash on Delivery</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="onlinePayment"
              checked={paymentMethod === "onlinePayment"}
              onChange={() => handlePaymentMethodChange("onlinePayment")}
              className="text-indigo-600 focus:ring-indigo-600"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Online Payment</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
        >
          {paymentMethod === "cashOnDelivery" ? "Confirm Order" : "Proceed to Pay"}
        </button>
      </div>
    </form>
      {/* <Footer /> */}
    </>
  );
}
