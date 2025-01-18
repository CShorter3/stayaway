import { useParams } from "react-router-dom";
import { useSelector, UseDispatch, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { fetchReviewsBySpotId } from "../../store/reviews";

const SpotDetailSnippet = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const reviews = useSelector((state) => state.reviews.reviews || {}); // ensure data exists
    const spotReviews = Object.values(reviews).filter((review) => review.spotId === parseInt(id)); // ensure integer comparison

    useEffect(() => {
        //if (spotReviews.length === 0) {
            dispatch(fetchReviewsBySpotId(id));
        //}
    }, [dispatch, id, spotReviews]);
    
    const newSpot = reviews.length === 0;
    // Provide reviews a value until reviews are fetched to prevent crashing before calculating average
    const averageRating = newSpot ? 0 : spotReviews.reduce((sum, currReview) => sum + currReview.stars, 0) / spotReviews.length;

    return (
        <div className="snippet">
            {newSpot ? ( <span> <FaStar /> New</span> ) : (
                <>
                    <span> <FaStar /> {averageRating.toFixed(1)} {" "}</span>
                    <span> · {spotReviews.length} {spotReviews.length === 1 ? "Review" : "Reviews"}</span>
                </>
            )}
        </div>
    );
};

export default SpotDetailSnippet;