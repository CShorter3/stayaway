import { useSelector } from "react-redux";
import { DeleteReviewModal } from "../DeleteReviewModal";
import { OpenModalButton } from "../OpenModalButton";
//import { useParams } from "react-router-dom";

const ReviewList = ( { reviews } ) => {
    // console.log("INSIDE REVIEW LIST, GRABBING REVIEWS FOR SPOT: ", spotId);

    // const allReviews = useSelector((state) => state.reviews.reviews || []); // OPTIMIZE LATER
    // const reviewsArray = Object.values(allReviews);
    // const reviews = reviewsArray.filter((review) => review.spotId === parseInt(spotId, 10));
    // console.log("Selecting the following reviews: ", reviews);

    const sessionUser = useSelector(state => state.session.user.id);
    console.log("Curent session user's id: ", sessionUser)
    
    const users = useSelector((state) => state.reviews.users || {});
    console.log("value of users", users);

    if(reviews.length === 0){
        return <p className="no-reviews"> Be the first to post a review!</p>;
    }
    
    return (
        <div className="review-list">
            {reviews
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((selectReview) => {
                    const reviewUser = users[selectReview.userId];
                    // console.log("in reviews, mapping over this User's review: ", reviewUser);
            return(
                <div key={selectReview.id} className="review-item">
                    <h4>{reviewUser ? reviewUser.firstName : "Anonymous"}</h4>
                    <p> {new Date(selectReview.createdAt).toLocaleString("default", {
                            month: "long", year: "numeric",
                        })}
                    </p>
                    <p>{selectReview.review}</p>
                    {selectReview.userId === sessionUser && (
                        <OpenModalButton
                            buttonText="Delete Review"
                            modalComponent={ <DeleteReviewModal reviewId={selectReview.id}/>}
                        />
                    )}
                </div>
            );
        })}
        </div>
    )
}

export default ReviewList;