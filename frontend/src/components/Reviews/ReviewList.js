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

    // Function to calculate the percentage of each rating level
    const calculateRatingPercentage = (rating) => {
        const count = reviews.filter(review => review.rating === rating).length;
        return (count / reviews.length) * 100 || 0;
    };

    return (
        <div className=" p-6">
            <div className="max-w-md mx-auto bg-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Learners feedback</h2>
                
                <div className="flex items-center mb-4">
                    <div className="text-6xl font-bold text-orange-600 mr-4">{averageRating}</div>
                    <div>
                        <div className="flex items-center mb-2">
                            {[...Array(Math.floor(averageRating))].map((_, index) => (
                                <i key={index} className="fas fa-star text-orange-600" />
                            ))}
                            {averageRating % 1 !== 0 && (
                                <i className="fas fa-star-half-alt text-orange-600" />
                            )}
                            {[...Array(5 - Math.ceil(averageRating))].map((_, index) => (
                                <i key={index} className="fas fa-star text-gray-300" />
                            ))}
                        </div>
                        <div className="text-orange-600">Course Rating</div>
                    </div>
                </div>

                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <div className="flex items-center mr-2">
                                {[...Array(rating)].map((_, index) => (
                                    <i key={index} className="fas fa-star text-orange-600" />
                                ))}
                                {[...Array(5 - rating)].map((_, index) => (
                                    <i key={index} className="fas fa-star text-gray-300" />
                                ))}
                            </div>
                            <div className="w-48 h-4 bg-gray-300 relative mr-2">
                                <div
                                    className="absolute top-0 left-0 h-4 bg-gray-600"
                                    style={{ width: `${calculateRatingPercentage(rating)}%` }}
                                />
                            </div>
                            <span className="text-purple-600">{calculateRatingPercentage(rating).toFixed(0)}%</span>
                        </div>
                    ))}
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
