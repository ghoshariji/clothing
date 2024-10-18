import React from 'react'

const Page = () => {
  return (
    <div>
      

      <footer className="bg-gray-100 p-8">
  <div className="container mx-auto">
   


    <div className="flex flex-col md:flex-row justify-between">
 
      <div className="mb-6 md:mb-0">
        <h3 className="font-bold mb-4">ABOUT US</h3>
        <ul className="text-sm">
          <li>Overlays Clothing P Ltd</li>
          <li><a href="#" className="text-gray-600 hover:underline">Explore to CHANGE.</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Learn More</a></li>
        </ul>
      </div>



      <div className="mb-6 md:mb-0">
        <h3 className="font-bold mb-4">FOOTER - POLICIES</h3>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-600 hover:underline">Return Your Order</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Shipping Policy</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Return, Refund, and Cancellation</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Terms and Conditions</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Privacy Policy</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Fraud Protection</a></li>
          <li><a href="#" className="text-gray-600 hover:underline">Contact Us</a></li>
        </ul>
      </div>


      <div className="mb-6 md:mb-0">
        <h3 className="font-bold mb-4">NEWSLETTER</h3>
        <p className="text-sm mb-4">You can be the first one to know about our new releases, latest offers and more. <a href="#" className="text-gray-600 hover:underline">Sign up now!</a></p>
        <form className="flex">
          <input type="email" placeholder="Your E-mail" className="p-2 border border-gray-400 rounded-l-md" />
          <button className="bg-black text-white px-4 rounded-r-md">→</button>
        </form>
      </div>


      <div className="mb-6 md:mb-0">
        <h3 className="font-bold mb-4">FOLLOW US</h3>
        <p className="text-sm mb-4">Stay in touch!</p>
        <div className="flex space-x-4">
          <a href="#"><img src="facebook-icon-url.png" alt="Facebook" className="h-6" /></a>
          <a href="#"><img src="twitter-icon-url.png" alt="Twitter" className="h-6" /></a>
          <a href="#"><img src="instagram-icon-url.png" alt="Instagram" className="h-6" /></a>
          <a href="#"><img src="youtube-icon-url.png" alt="YouTube" className="h-6" /></a>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-8 text-center text-sm text-gray-600">
    Overlays &copy; Powered by Shopify
  </div>
</footer>



    </div>
  )
}

export default Page
