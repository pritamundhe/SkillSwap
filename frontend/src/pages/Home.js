import React from 'react';

function Home() {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex items-center justify-between py-4 px-6 bg-purple-500 text-white">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1022/1022026.png"
            alt="SkillSwap logo"
            className="h-8"
          />
          <h1 className="ml-4 text-xl font-bold">
            SkillSwap
          </h1>
        </div>
        <nav className="flex space-x-6">
          <a
            href="#"
            className="hover:text-gray-300 font-medium"
          >
            Skills
          </a>
          <a
            href="#"
            className="hover:text-gray-300 font-medium"
          >
            Webinars
          </a>
          <a
            href="#"
            className="hover:text-gray-300 font-medium"
          >
            Resources
          </a>
          <a
            href="#"
            className="hover:text-gray-300 font-medium"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-gray-300 font-medium"
          >
            Log In
          </a>
          <button
            className="bg-white hover:bg-gray-200 text-purple-500 font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-800">
              Unlock Your Potential
            </h2>
            <h2 className="text-4xl font-bold text-gray-800">
              with SkillSwap
            </h2>
            <p className="text-lg mt-4 text-gray-600">
              Connect with experts, share your skills, and learn new ones on SkillSwap. Whether you're looking to teach, learn, or simply explore new talents, our platform offers the tools and resources you need to grow.
            </p>
            <div className="flex space-x-4 mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Learning
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Become an Instructor
              </button>
            </div>
            <div className="flex items-center space-x-8 mt-12">
              <div className="flex items-center">
                <svg
                  className="w-10 h-10 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 12l-6.91 3.74L12 21l-3.09-6.26L2 12l6.91-3.74L12 2z" />
                </svg>
                <span className="ml-2 font-medium text-gray-800">4.8</span>
                <span className="ml-1 text-gray-600">Average Rating</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-10 h-10 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 12l-6.91 3.74L12 21l-3.09-6.26L2 12l6.91-3.74L12 2z" />
                </svg>
                <span className="ml-2 font-medium text-gray-800">
                  10K+
                </span>
                <span className="ml-1 text-gray-600">Webinars</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-10 h-10 text-pink-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 12l-6.91 3.74L12 21l-3.09-6.26L2 12l6.91-3.74L12 2z" />
                </svg>
                <span className="ml-2 font-medium text-gray-800">
                  5K+
                </span>
                <span className="ml-1 text-gray-600">Instructors</span>
              </div>
            </div>
            <div className="mt-8">
              <span className="text-gray-600 font-medium">SkillSwap</span>
              <span className="ml-2 text-gray-600">|</span>
              <span className="ml-2 text-gray-600 font-medium">Empowerment through Learning</span>
            </div>
          </div>
          <div>
            <img
              src="https://i.ibb.co/wK5q7d2/learning.png"
              alt="Learning Adventure"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
