import { useSelector } from "react-redux";
//import { useParams } from "react-router-dom";

const ReviewList = ( {spotId} ) => {
    console.log("INSIDE REVIEW LIST, GRABBING REVIEWS FOR SPOT: ", spotId);

    const allReviews = useSelector((state) => state.reviews.reviews || []); // OPTIMIZE LATER
    const reviewsArray = Object.values(allReviews);
    const reviews = reviewsArray.filter((review) => review.spotId === parseInt(spotId, 10));
    console.log("Selecting the following reviews: ", reviews);

    const users = useSelector((state) => state.reviews.users || {});


    if(reviews.length === 0) {
        return (
            <p className = "no-reviews"> Be the first to post a review! </p>
        );
    }

return (
    <div className="review-list">
        {reviews.map((selectReview) => {
            const reviewUser = users[selectReview.userId];
            console.log("in reviews, mapping over this User's review: ", reviewUser);

            <div key={selectReview.id} className="review-item">
                <h4>{reviewUser ? reviewUser.firstName : "Anonymous"}</h4>
                <p>{selectReview.review}</p>
            </div>
        })}
    </div>
)


}

export default ReviewList;