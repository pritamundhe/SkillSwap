import React from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ProfileView = () => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/profile/edit'); // Adjust the path based on your routing setup
    };

    return (
        <div className="p-6 shadow-md max-w-7xl mx-auto flex flex-col gap-x-5 items-center my-6 bg-purple-100 lg:flex-row">
            <div className="flex flex-col lg:w-1/3 relative"> 
                {/* Profile Details */}
                <div className="flex flex-col gap-y-5 bg-white p-11 shadow-sm mb-6 items-center mt-6">
                    <h2 className="text-2xl font-semibold text-center">Profile Details</h2>
                    <Link to='/ProfileEdit'>
                    <button
                        className="absolute top-4 p-8 right-1 text-gray-500 hover:text-gray-700"
                    >
                        <FontAwesomeIcon icon={faPen} size="lg" />
                    </button>
                    </Link>
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        src="https://via.placeholder.com/64"
                        alt="Profile picture of Om Mali"
                    />
                    <div className="text-center">
                        <h3 className="text-xl font-semibold">Om Mali</h3>
                        <button className="mt-4 text-white bg-purple-600 border-2 border-purple-600 px-4 py-2 text-x hover:bg-white hover:text-purple-600">
                            Share profile link
                        </button>
                    </div>
                </div>
                {/* Work Preference */}
                <div className="bg-white p-8 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Work Preference</h3>
                    <div className="bg-purple-50 p-4">
                        <h4 className="font-medium">Desired Roles</h4>
                        <p className="text-gray-600 py-4">Student</p>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-8 shadow-sm lg:flex-grow mt-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Experience</h3>
                    <div className="mb-4 bg-purple-50 p-4">
                        <h4 className="text-gray-600 font-semibold">Projects</h4>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 py-4">
                                Showcase your skills to recruiters with job-relevant projects.<br />
                                Add projects here to demonstrate your technical expertise and ability to solve real-world problems.
                            </p>
                            <button className="text-sm text-blue-700 font-semibold border  p-2 bg-purple-400 text-white hover:border-purple-600 hover:text-purple-600 hover:bg-white" >Browse Projects</button>
                        </div>
                    </div>

                    <div className="mb-4 bg-purple-50 p-4">
                        <h4 className="text-gray-600 font-semibold">Work History</h4>
                        <div className="flex justify-between items-center py-4">
                            <p className="text-sm text-gray-500">
                                Add your past work experience here. If you're just starting out, you can add internships or volunteer experience instead.
                            </p>
                            <button className="text-sm text-blue-700 font-semibold border  p-2 bg-purple-400 text-white hover:border-purple-600 hover:text-purple-600 hover:bg-white w-xl">
                                Add Experience
                            </button>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-4">Education</h3>
                    <div className="bg-purple-50 p-4">
                        <h4 className="text-gray-600 font-semibold">Credentials</h4>
                        <p className="text-sm text-gray-500 py-4">Get job-ready with role-based training from industry-leading companies</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileView;
