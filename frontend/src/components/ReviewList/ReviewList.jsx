import { useSelector } from "react-redux";

const ReviewList = ({ spotId }) => {

    const reviews = useSelector((state) => state.reviews[spotId] || []);

    if(reviews.length === 0) {
        return (
            <p className = "no-reviews"> Be the first to post a review! </p>
        );
    }

    return (
        <div className="review-list">
            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <h4>{review.User.firstName}</h4>
                    <p>{review.comment}</p>
                </div>
            ))}
    </div>
    )


}

export default ReviewList;