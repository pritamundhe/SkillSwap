import React from 'react';

function ContactUs() {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-50 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="flex gap-6 flex-wrap justify-center">
        {/* Contact Us Card */}
        <div className="flex-1 max-w-lg min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-3xl font-bold text-purple-700 mb-6">Contact Us</h3>
          <p className="text-gray-600 mb-6">
            Have questions or need assistance? Feel free to reach out to us.
          </p>

          {/* Contact Information */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <p className="text-gray-800">Email: contact.skillswap@gmail.com</p>
            <p className="text-gray-800">Phone: +1 234 567 890</p>
            <p className="text-gray-800">Address: 123 SkillSwap St, Learning City, 12345</p>
          </div>

          {/* Message Field */}
          <div className="w-full max-w-md">
            <form className="flex flex-col gap-4">
              <textarea 
                rows="4" 
                placeholder="Your Message" 
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;