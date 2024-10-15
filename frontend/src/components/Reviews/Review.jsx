import React from 'react';

function Review({ review }) {
    const { rating, comment, createdAt, createdby } = review; // Destructuring the review object

    // Function to generate star rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? 'text-purple-600' : 'text-gray-300'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className='m-2.5 bg-white p-2.5 rounded-sm'>
            <article>
                <div className="flex items-center mb-4 gap-3">
                    <span className="material-symbols-outlined text-4xl">
                        account_circle
                    </span>
                    <div className="font-medium text-black">
                        <p>Guest <time className="block text-sm text-gray-500">Posted on {new Date(createdAt).toDateString()}</time></p>
                    </div>
                </div>

                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    {renderStars()}
                </div>

                <footer className="mb-5 text-sm text-gray-500">
                    <p>Reviewed on <time>{new Date(createdAt).toLocaleDateString()}</time></p>
                </footer>

                <p className="mb-2 text-gray-500">{comment}</p>

                <div>
                    <p className="mt-1 text-xs text-gray-500">19 people found this helpful</p>
                    <div className="flex items-center mt-3">
                        <a href="#" className="px-2 py-1.5 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">Helpful</a>
                        <a href="#" className="ml-4 text-sm font-medium text-blue-600 hover:underline">Report abuse</a>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default Review;
