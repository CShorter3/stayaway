import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewSummary = () => {
    const { id } = useParams();
    const reviews = useSelector((state) => state.reviews[id] || []);

    // Check if count is 0
    const newSpot = reviews.length === 0;

    // Calculate average rating, ensuring no division by zero
    const averageRating = reviews.reduce((sum, currReview) => sum + currReview.stars, 0) / reviews.length;

    return (
        <div className="reputation-snapshot">
            {newSpot ? ( <span>⭐ New</span> ) : (
                <>
                    <span>  {averageRating.toFixed(1)} </span>
                    <span> · {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}</span>
                </>
            )}
        </div>
    );
};

export default ReviewSummary;