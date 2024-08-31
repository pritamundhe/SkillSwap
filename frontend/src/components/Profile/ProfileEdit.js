
import React, { useState } from 'react';

const ProfileEdit = () => {
    // State to manage form data
    const [profile, setProfile] = useState({
        name: 'Om Mali',
        email: 'om.mali@example.com',
        workPreference: 'Student',
        projects: '',
        workHistory: '',
        education: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., API call)
        console.log('Profile updated:', profile);
    };

    return (
        <div className="p-6 shadow-md max-w-7xl mx-auto bg-purple-100">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar */}
                <div className="flex flex-col lg:w-1/3 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center">
                            <img
                                className="w-24 h-24 rounded-full object-cover mr-4"
                                src="https://via.placeholder.com/64"
                                alt="Profile"
                            />
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-700">
                                Change Profile Picture
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="workPreference" className="block text-gray-700 font-medium">Work Preference</label>
                                    <input
                                        id="workPreference"
                                        name="workPreference"
                                        type="text"
                                        value={profile.workPreference}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="projects" className="block text-gray-700 font-medium">Projects</label>
                                    <textarea
                                        id="projects"
                                        name="projects"
                                        rows="3"
                                        value={profile.projects}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="workHistory" className="block text-gray-700 font-medium">Work History</label>
                                    <textarea
                                        id="workHistory"
                                        name="workHistory"
                                        rows="3"
                                        value={profile.workHistory}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="education" className="block text-gray-700 font-medium">Education</label>
                                    <textarea
                                        id="education"
                                        name="education"
                                        rows="3"
                                        value={profile.education}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Additional Settings</h2>
                    <p className="text-gray-600 mb-4">Here you can manage additional settings or preferences for your profile.</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-700">
                        Manage Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
