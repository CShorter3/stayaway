import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReserveButton from "./ReserveButton";
import { fetchSpot, fetchSpots } from "../../store/spots";
import { fetchReviewsBySpotId } from "../../store/reviews";
import {SpotDetailSnippet} from "../SpotDetailSnippet";
import {ReviewList} from "../ReviewList";

const SpotDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.spots[id]);
    const owners = useSelector((state) => state.spots.Owners);
    const sessionUser = useSelector((state) => state.session.user);
    const spotReviews = useSelector((state) =>
        Object.values(state.reviews.reviews || {}).filter((review) => review.spotId === parseInt(id, 10))
    );

    useEffect(() => {
        if (!spot) {
            dispatch(fetchSpots());
            dispatch(fetchSpot(id));
        }
        if (!spotReviews.length) {
            dispatch(fetchReviewsBySpotId(id));
        }
    }, [dispatch, id, spot, spotReviews.length]);

    if (!spot) return <p>Spot not found or loading...</p>;

    const owner = owners ? owners[spot.ownerId] : null;
    const spotIsOwnedBySession = sessionUser && spot.ownerId === sessionUser.id;

    return (
        <div className="overview-container">
            <section className="header">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </section>
            <section className="gallery">
                <div>
                    <img src={spot.previewImage || ""} alt="Main spot image" />
                </div>
                <div className="pic-box">
                    {spot.SpotImages && spot.SpotImages.slice(0, 4).map((image, index) => (
                        <img key={index} src={image.url} alt={`Image ${index + 1}`} />
                    ))}
                </div>
            </section>
            <section className="details">
                <div className="blurb">
                    <h3>Hosted by {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown Host"}</h3>
                    <p>{spot.description}</p>
                </div>
                <div className="reserve">
                    <ReserveButton />
                </div>
            </section>
            <section className="Review-container">
                <SpotDetailSnippet />
                {sessionUser && !spotIsOwnedBySession && <button>Add Review</button>}
                <ReviewList reviews={spotReviews} />
            </section>
        </div>
    );
};

export default SpotDetail;
