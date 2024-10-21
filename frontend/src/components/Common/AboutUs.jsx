import React from 'react';

function AboutUs() {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-50 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 max-w-3xl bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:shadow-2xl transform-gpu">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">About Skill Swap</h1>
        <p className="text-gray-600 mb-6">
          Skill Swap is a community-driven platform designed to foster learning and collaboration. It allows individuals to exchange skills based on their mutual interests, promoting growth and knowledge sharing without financial transactions.
        </p>
        <p className="text-gray-600 mb-6">
          Whether you're an expert or a beginner, Skill Swap provides an equitable and enjoyable experience for all, helping users pair up with others who complement their skills and learning goals. It's a place where everyone has the opportunity to learn something new, teach what they know, and grow together.
        </p>
        <h3 className="text-2xl font-bold text-purple-700 mb-6">Our Mission</h3>
        <p className="text-gray-600 mb-6">
          We aim to create a platform where learning is accessible to all, driven by community spirit and the desire to share knowledge. Our mission is to build a user-friendly platform that promotes equitable opportunities for teaching and learning across diverse skillsets.
        </p>
    
      </div>
      
    </div>
  );
}

export default AboutUs;