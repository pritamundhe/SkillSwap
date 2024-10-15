import { useState, useEffect } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm"; // Import the ReviewForm component
import axios from 'axios';

const ReviewList = ({ onReviewAdded, skillId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [userReviewed, setUserReviewed] = useState(false); // State to track if user has reviewed

    useEffect(() => {
        const fetchReviews = async () => {
            if (!skillId || skillId.length !== 24) {
                console.error("Invalid skill ID format.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/review/getReview/${skillId}`);
                const fetchedReviews = response.data.reviews || [];
                setReviews(fetchedReviews);
                setLoading(false);

                // Calculate average rating
                const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                const average = fetchedReviews.length > 0 ? (totalRating / fetchedReviews.length).toFixed(1) : 0;
                setAverageRating(average);

                // Check if the current user has already reviewed
                const userId = localStorage.getItem('userId');
                const hasReviewed = fetchedReviews.some(review => review.userId === userId);
                setUserReviewed(hasReviewed);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError('Failed to load reviews. Please try again later.');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [skillId]);

    // Handle the addition of a review
    const handleReviewAdded = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]); // Add the new review to the list
        // Update average rating
        const updatedTotal = averageRating * reviews.length + newReview.rating;
        setAverageRating((updatedTotal / (reviews.length + 1)).toFixed(1));
        setUserReviewed(true); // Mark that the user has reviewed
    };

    return (
        <div className="bg-white bg-inherit p-6">
            <div className="flex flex-col md:flex-row  gap-3">
                <div className="w-full md:w-1/4">
                    <div className="shadow-md shadow-gradient-to-r from-purple-100 to-blue-200 p-2.5 rounded-sm py-5 bg-white">
                        <h2 className="my-2.5 text-4xl font-bold">Reviews</h2>
                        {/* Star Ratings */}
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 ${index < averageRating ? 'text-purple-500' : 'text-gray-400'} me-1`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))}
                            <p className="ms-1 text-sm font-medium text-gray-500">{averageRating} out of 5</p>
                        </div>
                    </div>

                    <hr className="my-2.5" />

                    {/* Show Review Form only if the user hasn't reviewed */}
                    {!userReviewed && (
                        <ReviewForm skillId={skillId} onReviewAdded={handleReviewAdded} />
                    )}
                    {userReviewed && <p className="text-red-500">Review Submitted</p>}
                </div>

                <div className="w-full md:w-3/4">
                    <div className="max-w-full mx-auto p-6 bg-white rounded-sm shadow-md">
                        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
                        <hr />

                        {/* Show loading spinner or error */}
                        {loading ? (
                            <p>Loading reviews...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <Review key={review._id} review={review} />
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
