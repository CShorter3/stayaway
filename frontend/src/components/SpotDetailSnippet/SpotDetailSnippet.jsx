import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa';

const SpotDetailSnippet = () => {

    const { id } = useParams();
    const reviews = useSelector((state) => state.reviews[id] || []);

    const newSpot = reviews.length === 0;
    // Provide reviews a value until reviews are fetched to prevent crashing before calculating average
    const averageRating = newSpot ? 0 : reviews.reduce((sum, currReview) => sum + currReview.stars, 0) / reviews.length;

    return (
        <div className="snippet">
            {newSpot ? ( <span> <FaStar /> New</span> ) : (
                <>
                    <span> <FaStar /> {averageRating.toFixed(1)} {" "}</span>
                    <span> · {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}</span>
                </>
            )}
        </div>
    );
};

export default SpotDetailSnippet;