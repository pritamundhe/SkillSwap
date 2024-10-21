import React from 'react';

function TermsOfUse() {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-50 to-blue-100 min-h-screen flex justify-center items-center ">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 max-w-4xl my-5 bg-opacity-35 ">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Terms of Use</h1>
        <p className="text-gray-600 mb-6">
          Welcome to Skill Swap! By using our platform, you agree to the following terms and conditions. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing or using Skill Swap, you agree to comply with and be bound by these terms. If you do not agree, please do not use our platform.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">2. User Responsibilities</h2>
        <p className="text-gray-600 mb-4">
          You are responsible for providing accurate and current information when creating a profile or engaging with other users. Any misuse or fraudulent behavior will result in termination of your account.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">3. Skill Exchange</h2>
        <p className="text-gray-600 mb-4">
          Skill Swap facilitates a mutual exchange of skills between users. No monetary transactions are allowed, and users must agree on the terms of the skill exchange.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">4. Privacy Policy</h2>
        <p className="text-gray-600 mb-4">
          We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for more details on how we handle your data.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          Skill Swap is not responsible for any disputes, disagreements, or losses that may arise between users during skill exchanges. Use of the platform is at your own risk.
        </p>
        <h2 className="text-xl font-semibold text-purple-600 mb-4">6. Changes to Terms</h2>
        <p className="text-gray-600 mb-6">
          We may update these terms from time to time. Your continued use of the platform signifies acceptance of any changes.
        </p>
      </div>
    </div>
  );
}

export default TermsOfUse;