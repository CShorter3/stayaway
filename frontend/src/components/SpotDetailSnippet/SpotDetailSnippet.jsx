import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { fetchReviewsBySpotId } from "../../store/reviews";

const SpotDetailSnippet = () => {
    console.log("IN SPOT DETAIL SNIPPET!")

    const { id } = useParams();

    /* testing */
    // console.log("lets see what Review object looks like");
   
    // const currState = useSelector((state) => state)
    // console.log("Lets see current state", currState);
    // const reviewsObj = useSelector((state) => state.reviews)
    // console.log("lets see state.reviews: ", reviewsObj);
    // const currReviews = useSelector((state) => state.reviews.reviews)
    // console.log("lets see state.reviews.reviews: ", reviewsObj);

    console.log("searching for reviews for spot id: ", id)
    const dispatch = useDispatch();
    // console.log("value of dispatch", dispatch);

    const reviews = useSelector((state) => state.reviews.reviews || {}); // ensure data exists
    console.log("selected object", reviews) // <-- NOT RECIEVING THE REVIEW DATA
    const spotReviews = Object.values(reviews).filter((review) => review.spotId === parseInt(id, 10)); // ensure integer comparison

    useEffect(() => {
        //if(spotReviews.length === 0){
        if(!Object.keys(reviews).length){
            console.log("Dispatching fetchReviewsBySpotId with id:", id); // Add this log
            dispatch(fetchReviewsBySpotId(id));
        }
    }, [dispatch, id, reviews]);
    
    console.log("selected object", reviews)


    // const newSpot = reviews.length === 0;
    const newSpot = Object.keys(reviews).length === 0;
    // Provide reviews a value until reviews are fetched to prevent crashing before calculating average
    const averageRating = newSpot ? 0 : spotReviews.reduce((sum, currReview) => sum + currReview.stars, 0) / spotReviews.length; // !!!WHAT IF LENGHT IS ZERO!!!

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