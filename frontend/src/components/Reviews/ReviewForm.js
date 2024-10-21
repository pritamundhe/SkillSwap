import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ skillId, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingLabel, setRatingLabel] = useState('');

    const getRatingLabel = (ratingValue) => {
        switch (ratingValue) {
            case 1:
                return 'Awful, not what I expected at all';
            case 2:
                return 'Poor, pretty disappointed';
            case 3:
                return 'Average, could be better';
            case 4:
                return 'Good, what I expected';
            case 5:
                return 'Amazing, above expectations!';
            default:
                return ' ';
        }
    };

    const handleRatingChange = (star) => {
        setRating(star);
        setRatingLabel(getRatingLabel(star)); // Update label on star click
    };

    const handleMouseEnter = (star) => {
        setHoverRating(star);
        setRatingLabel(getRatingLabel(star)); // Update label on hover
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
        setRatingLabel(getRatingLabel(rating)); // Reset to selected rating
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        try {
            const response = await axios.post(`http://localhost:5000/review/addReview`, {
                userId,
                skillId,
                rating,
                comment: description,
            });
            console.log(response.data);

            // Call the callback to update the reviews in the parent component
            onReviewAdded(response.data.review);

            // Reset the form
            setRating(0);
            setDescription('');
            setRatingLabel(''); // Reset the label
        } catch (error) {
            console.error("Error adding review:", error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="max-w-lg md:w-full bg-white rounded-md p-4">
            <h2 className="text-center text-2xl font-semibold mb-2">Why did you leave this rating?</h2>
            <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="mb-4">
                    
                        <div className="text-center text-gray-600 mt-2 mb-2"> {/* Added margin-bottom */}
                            <strong>{ratingLabel}</strong>
                        </div>
                    
                    <div className="flex justify-center space-x-3 mb-10">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`w-9 h-9 text-4xl ${star <= (hoverRating || rating) ? 'text-purple-600' : 'text-gray-300'}`}
                                onClick={() => handleRatingChange(star)}
                                onMouseEnter={() => handleMouseEnter(star)}
                                onMouseLeave={handleMouseLeave}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Description */}
                <div className="">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-500 p-4 rounded-sm mb-4"
                        rows="4"
                        placeholder="Write your review here..."
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-2 bg-gray-900 text-white font-semibold rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
