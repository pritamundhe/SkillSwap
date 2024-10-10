import React from 'react'


const Pricing = () => {
    return (
        <div>
            <div className="bg-gradient-to-r min-h-screen from-purple-100 to-blue-200 flex justify-center items-center p-8 h-1/2">
            <h1 className='text-7xl font-[900]'>START YOUR SKILL JOURNEY NOW</h1>
                <div className="flex gap-6 flex-wrap justify-center h-3/4">
                        <div className="flex-1 max-w-xs min-w-[300px] bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
                            <h3 className="text-2xl font-bold text-purple-700 mb-4">BASIC</h3>
                            <p className="text-gray-600 mb-4">Trial Plan</p>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-purple-800">0 $</span>
                                <br />
                                <span className="text-gray-500">Free plan</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <strong> Ads</strong>
                                <br />
                                <strong>Limited watch-time(1 day)</strong>
                            </p>
                            <div className="mb-6">
                                <button
                                    onClick={() => alert('Joining webinar...')}
                                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    BUY
                                </button>
                            </div>
                            
                        </div>
                        <div className="flex-1 max-w-xs min-w-[300px] bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
                            <h3 className="text-2xl font-bold text-purple-700 mb-4">Gold</h3>
                            <p className="text-gray-600 mb-4">Trial Plan</p>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-purple-800">4.99 $</span>
                                <br />
                                <span className="text-gray-500">Gold plan</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <strong>No-Ads</strong>
                                <br />
                                <strong> Months</strong>
                            </p>
                            <div className="mb-6">
                                <button
                                    onClick={() => alert('Joining webinar...')}
                                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    BUY
                                </button>
                            </div>
                            
                        </div>
                        <div className="flex-1 max-w-xs min-w-[300px] bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
                            <h3 className="text-2xl font-bold text-purple-700 mb-4">PREMINUM</h3>
                            <p className="text-gray-600 mb-4">Preminum Plan</p>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-purple-800">13.99 $</span>
                                <br />
                                <span className="text-gray-500">Free plan</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <strong> No -Ads</strong>
                                <br />
                                <strong>3 Months</strong>
                            </p>
                            <div className="mb-6">
                                <button
                                    onClick={() => alert('Joining webinar...')}
                                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    BUY
                                </button>
                            </div>
                            
                        </div>
                    
                </div>
            </div>
    
        </div>
    )
}

export default Pricing
