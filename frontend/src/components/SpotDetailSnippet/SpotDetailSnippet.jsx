import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { fetchReviewsBySpotId } from "../../store/reviews";

const SpotDetailSnippet = () => {
    //console.log("IN SPOT DETAIL SNIPPET!")

    const { id } = useParams();
    // get current session user's id
    const dispatch = useDispatch();

    // const sessionUserId = useSelector((state) => state.session.user.id);
    // get current spot's owner id and check if it equals current user's if
    // const spotIsOwnedBySession = useSelector((state) => state.spots.spots[id] === sessionUserId);

    /* testing */
    // console.log("lets see what Review object looks like");
   
    // const currState = useSelector((state) => state)
    // console.log("Lets see current state", currState);
    // const reviewsObj = useSelector((state) => state.reviews)
    // console.log("lets see state.reviews: ", reviewsObj);
    // const currReviews = useSelector((state) => state.reviews.reviews)
    // console.log("lets see state.reviews.reviews: ", reviewsObj);

    //console.log("searching for reviews for spot id: ", id)
    
    const spotReviews = useSelector((state) =>
        Object.values(state.reviews.reviews || {})
            .filter((review) => review.spotId === parseInt(id, 10)));

    // const reviews = useSelector((state) => state.reviews.reviews || {}); // ensure data exists
    // console.log("selected object", reviews) // <-- NOT RECIEVING THE REVIEW DATA
    

    useEffect(() => {
        if(!spotReviews.length){
        //if(!Object.keys(reviews).length){
            //console.log("rendering fetch dispatch from SpotDetailSnippet on id: ", id); // Add this log
            dispatch(fetchReviewsBySpotId(id));
        }
    }, [dispatch, id, spotReviews.length]);
    
    //const newSpot = Object.keys(reviews).length === 0;
    // const hasNoReview = spotReviews.length === 0;
    // const hasOneReview = spotReviews.length === 1;

    // Default average rating to zero if spot have 0 reviews - to prevent unpredictable behavior
    // const averageRating = hasNoReview ? 0 : spotReviews.reduce((sum, review) => sum + review.stars, 0) / spotReviews.length;
    const averageRating = spotReviews.length
        ? spotReviews.reduce((sum, review) => sum + (review.stars || 0), 0) / spotReviews.length
        : 0;


    return (
        <div className="snippet">
            {spotReviews.length === 0 ? ( 
                <span> <FaStar /> New</span> 
                // if hasNoReview is true && !spotIsOwnedBySession, render <button> create spot <button/>
            ) : (
                <>
                    <span> <FaStar /> {averageRating.toFixed(1)} {" "}</span>
                    <span> · {spotReviews.length} {spotReviews.length === 1 ? "Review" : "Reviews"}</span>
                </>
            )}
        </div>
    );
};

export default SpotDetailSnippet;


// return (
//     <div className="snippet">
//         {hasNoReview ? ( 
//             <span> <FaStar /> New</span> 
//             // if hasNoReview is true && !spotIsOwnedBySession, render <button> create spot <button/>
//         ) : (
//             <>
//                 <span> <FaStar /> {averageRating.toFixed(1)} {" "}</span>
//                 <span> · {spotReviews.length} {hasOneReview ? "Review" : "Reviews"}</span>
//             </>
//         )}
//     </div>
// );