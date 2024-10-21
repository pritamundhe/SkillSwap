import React from 'react';

function Review({ review }) {
    const { rating, comment, createdAt, createdby } = review; // Destructuring the review object

    // Function to generate star rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                />
            );
        }
        return stars;
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-md mb-4'>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full">
                        <span className="text-lg font-bold">{createdby ? createdby[0] : 'G'}</span> {/* Show first letter of user's name or "G" for Guest */}
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold">{createdby || 'Guest'}</h4> {/* Display "Guest" if createdby is not available */}
                        <span className="text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        {renderStars()} {/* Display the stars */}
                    </div>
                    <p className="mt-1 text-gray-700">{comment}</p>
                    <div className="mt-2 flex items-center space-x-4 text-gray-500">
                        <span>Was this review helpful?</span>
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1">
                                <i className="fas fa-thumbs-up"></i>
                                <span>1</span>
                            </button>
                            <button className="flex items-center space-x-1">
                                <i className="fas fa-thumbs-down"></i>
                                <span>0</span>
                            </button>
                        </div>
                        <a href="#" className="text-gray-500">Report</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
