import { useState ,useEffect} from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm"; // Import the ReviewForm component
import axios from 'axios';

const ReviewList = ({onReviewAdded,skillId,skill}) => {
    
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        const fetchReviews = async () => {
            console.log(skillId)
            if (!skillId || skillId.length !== 24) {
                console.error("Invalid skill ID format.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/review/getReview/${skillId}`);
                setReviews(response.data.reviews);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            }
        };
    
        fetchReviews();
    }, [skillId]);


    return (
        <div className="bg-gray-100 p-5">
            <div className="m-4 flex flex-col md:flex-row lg:mx-16 gap-3">
                <div className="w-full md:w-1/4">
                    <div className="shadow-md shadow-gray-400 p-2.5 rounded-sm py-5 bg-white">
                        <h2 className="my-2.5 text-4xl font-bold">Reviews</h2>
                        {/* Star Ratings */}
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-purple-500 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-purple-500 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-purple-500 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-purple-500 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-gray-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>

                            <p className="ms-1 text-sm font-medium text-gray-500">4 out of 5</p>
                        </div>
                    </div>

                    <hr className="my-2.5"></hr>

                    <ReviewForm skillId={skillId} onReviewAdded={onReviewAdded} />

            </div>

            <div className="w-full md:w-3/4">
                    <div className="max-w-full mx-auto p-6 bg-white rounded-sm shadow-md">
                        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
                        <hr />

                        {/* Step 4: Show loading spinner or error */}
                        {loading ? (
                            <p>Loading reviews...</p>
                        ) : (
                            reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <Review key={index} review={review} />
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
