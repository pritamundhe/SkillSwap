import React, { useState } from 'react';

const CreateWebinar = () => {
    // State to store form data
    const [webinarData, setWebinarData] = useState({
        title: '',
        description: '',
        fee: '',
        date: '',
        time: '',
        googleMeetLink: '',  // New field for Google Meet link
        features: ['', '', ''],  // Array to hold three features
    });

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWebinarData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle feature changes
    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...webinarData.features];
        updatedFeatures[index] = value;
        setWebinarData(prevState => ({
            ...prevState,
            features: updatedFeatures
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Webinar Data:', webinarData);
        // Perform API call to save webinar data or other actions
    };

    return (
        <div className='bg-gradient-to-r from-purple-100 to-blue-200 py-6'>
            <form onSubmit={handleSubmit} className="w-3/4 mx-auto bg-white p-6 rounded-lg shadow-md bg-opacity-45 ">
                <h2 className="text-2xl font-bold mb-6 text-start text-purple-600">Host a Webinar</h2>
                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        {/* Webinar Title */}
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Webinar Title</label>
                            <input
                                type="text"
                                name="title"
                                value={webinarData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter webinar title"
                                required
                            />
                        </div>

                        {/* Webinar Description */}
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                value={webinarData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter webinar description"
                                required
                            />
                        </div>

                        {/* Webinar Fee */}
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Fee</label>
                            <input
                                type="number"
                                name="fee"
                                value={webinarData.fee}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter fee (e.g., 20.00)"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        {/* Date and Time */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block font-medium mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={webinarData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block font-medium mb-2">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={webinarData.time}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        {/* Google Meet Link */}
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Google Meet Link</label>
                            <input
                                type="url"
                                name="googleMeetLink"
                                value={webinarData.googleMeetLink}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter Google Meet link"
                                required
                            />
                        </div>

                        {/* Webinar Features */}
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Features</label>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={webinarData.features[0]}
                                    onChange={(e) => handleFeatureChange(0, e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter first feature"
                                    required
                                />
                                <input
                                    type="text"
                                    value={webinarData.features[1]}
                                    onChange={(e) => handleFeatureChange(1, e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter second feature"
                                />
                                <input
                                    type="text"
                                    value={webinarData.features[2]}
                                    onChange={(e) => handleFeatureChange(2, e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter third feature"
                                />
                            </div>
                        </div>
                    </div>
                </div>




                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-1/4 text-white bg-purple-500 py-2 rounded-md text-lg hover:bg-purple-700 transition duration-300 mx-auto"
                >
                    Create Webinar
                </button>
            </form>
        </div>
    );
};

export default CreateWebinar;
