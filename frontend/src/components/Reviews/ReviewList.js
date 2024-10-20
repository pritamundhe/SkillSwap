import { useState, useEffect } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import axios from 'axios';

const ReviewList = ({ skillId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [userReviewed, setUserReviewed] = useState(false);

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

                const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                const average = fetchedReviews.length > 0 ? (totalRating / fetchedReviews.length).toFixed(1) : 0;
                setAverageRating(average);

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

    const handleReviewAdded = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
        const updatedTotal = averageRating * reviews.length + newReview.rating;
        setAverageRating((updatedTotal / (reviews.length + 1)).toFixed(1));
        setUserReviewed(true);
    };

    return (
        <div className="bg-gray-50 p-4">
            <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Reviews</h2>

                <div className="bg-gray-100 p-3 rounded-lg mb-4 text-center">
                    <h3 className="text-2xl font-bold text-purple-600">{averageRating}</h3>
                    <div className="flex justify-center mb-2">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${index < averageRating ? 'text-purple-500' : 'text-gray-400'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">{averageRating} out of 5 stars</p>
                </div>

                {!userReviewed && (
                    <ReviewForm skillId={skillId} onReviewAdded={handleReviewAdded} />
                )}
                {userReviewed && <p className="text-green-600 text-center mb-4">You have already submitted a review.</p>}

                {loading ? (
                    <p className="text-center text-gray-600">Loading reviews...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="space-y-2">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Review key={review._id} review={review} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
