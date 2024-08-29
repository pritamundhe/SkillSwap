import React from 'react';
import image from '../assets/images/image.jpg';

function Home() {
  return (
    <main className="bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">Embark on a Learning Adventure Online</h1>
            <p className="mt-4 text-gray-600">Explore new subjects, acquire valuable skills, and shape your knowledge at your own pace, all from the comfort of your digital classroom.</p>
            <div className="mt-8 space-x-4">
              <button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Explore More</button>
              <button className="text-gray-600 bg-gray hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Financial Aid</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={image} alt="Learning Adventure" className="w-full" />
          </div>
        </div>
      </section>
      {/* Search Section */}
      <section className="py-1 bg-white">
        <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800">Search among 58,340 Skills and find your Passion</h2>
          <div className="mt-8 flex justify-center">
            <input type="text" placeholder="Search Anything" className="w-full max-w-lg px-4 py-2 border border-gray-300 " />
            <button className="text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Search</button>
          </div>
        </div>
      </section>
      {/* Collaborations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">Over 100 Universities And Companies Collaborate With Us</h2>
          <div className="mt-8 flex justify-center space-x-8">
            <img src="/path/to/logo1.png" alt="Company 1" className="h-12" />
            <img src="/path/to/logo2.png" alt="Company 2" className="h-12" />
            <img src="/path/to/logo3.png" alt="Company 3" className="h-12" />
            <img src="/path/to/logo4.png" alt="Company 4" className="h-12" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img src="/path/to/features-image.png" alt="Features" className="w-full" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">Our Online Education Is Smart & Effective</h2>
              <p className="mt-4 text-gray-600">Online education can be a convenient and flexible option for students who are unable to attend traditional in-person classes due to their location or schedule.</p>
              <button className="mt-8 text-white bg-purple-600 hover:bg-white border border-purple-600 hover:text-purple-600 px-4 py-1.5">Let's Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* What Will You Get Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">What Will You Get?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">1-on-1 lessons in more than 150 languages</h3>
              <p className="mt-4 text-gray-600">Learn from certified teachers with proven experience.</p>
            </div>
            <div className="bg-white p-8 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Practice for free with the Talki community</h3>
              <p className="mt-4 text-gray-600">Build connections with others and share your skills.</p>
            </div>
            <div className="bg-white p-8 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Take learning beyond the classroom</h3>
              <p className="mt-4 text-gray-600">Expand your knowledge in a transformative learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}

export default Home;
