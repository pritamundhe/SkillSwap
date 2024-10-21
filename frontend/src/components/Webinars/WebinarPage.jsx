import React from 'react';
import { Link } from 'react-router-dom';


function WebinarPage() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen flex justify-center items-center">
      <div className="flex gap-6 flex-wrap justify-center">
        {/* Card 1: Join Webinar */}
        <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Join Webinar</h3>
          <p className="text-gray-600 mb-6">Learn from experts in live sessions.</p>
          <div className="flex justify-center">
            <Link to="/join">
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
                Click Here
              </button>
            </Link>
          </div>
        </div>

        {/* Card 2: Take Webinar */}
        <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Take Webinar</h3>
          <p className="text-gray-600 mb-6">Host and manage your own webinar sessions.</p>
          <div className="flex justify-center">
            <Link to="/createwebinar">
            <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
              Click Here
            </button>
            </Link>
          </div>
        </div>

        {/* Card 3: Webinar Calendar */}
        <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Webinar schedule</h3>
          <p className="text-gray-600 mb-6">View your  webinars<br/>See your upcoming webinars.</p>
          <div className="flex justify-center items-end ">
            <Link to="/webinar">
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
                Click Here
              </button>
            </Link>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default WebinarPage;