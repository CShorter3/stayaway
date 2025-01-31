import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReserveButton from "./ReserveButton";
import { fetchSpot } from "../../store/spots";
import { fetchReviewsBySpotId } from "../../store/reviews";
import { SpotDetailSnippet } from "../SpotDetailSnippet";
import { ReviewList } from "../ReviewList";
import { ReviewFormModal } from "../ReviewFormModal";
import { useModal } from '../../Context/Modal';
import "./SpotDetail.css";

const SpotDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { setModalContent/*, closeModal*/ } = useModal();


    // Select spot and related data from Redux
    const spot = useSelector((state) => state.spots.spots[id]);
    //const price = spot.price;
    //console.log("*************** THIS IS THE PRICE*****: ", price);
    const owners = useSelector((state) => state.spots.Owners || {});
    const sessionUser = useSelector((state) => state.session.user);

    const spotImages = useSelector((state) =>
        Object.values(state.spots.SpotImages || {}).filter(
            (image) => image.spotID === parseInt(id, 10)
        )
    );

    const spotReviews = useSelector((state) =>
        Object.values(state.reviews.reviews || {}).filter(
            (review) => review.spotId === parseInt(id, 10)
        )
    );

    // check is authenticated session user has posted review at spot
    const hasUserPostedReview = spotReviews.some(
        (review) => review.userId === sessionUser?.id
    );

    useEffect(() => {
        dispatch(fetchSpot(id));
        dispatch(fetchReviewsBySpotId(id));
    }, [dispatch, id]);

    if (!spot) return <p>Spot not found or loading...</p>;

    // access owner object of spot
    const owner = owners ? owners[spot.ownerId] : null;

    // prepare logic to check if spot is owned by the logged in user
    const spotIsOwnedBySession =
        sessionUser && spot.ownerId === sessionUser.id;

    return (
        <div className="overview-container">
            <section className="header">
                <h2>{spot.name}</h2>
                <h5>
                    {spot.city}, {spot.state}, {spot.country}
                </h5>
            </section>
            <section className="gallery">
                <div>
                    <img
                        src={spot.previewImage || ""}
                        alt="Main spot image"
                    />
                </div>
                <div className="pic-box">
                    {spotImages &&
                        spotImages.slice(0, 4).map((image, index) => (
                            <img key={index} src={image.url} alt={`Image ${index + 1}`} />
                        ))}
                </div>
            </section>
            <section className="details">
                <div className="blurb">
                    <h3>
                        Hosted by {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown Host"}
                    </h3>
                    <p>{spot.description}</p>
                </div>
                <div className="reserve">
                    <ReserveButton />
                </div>
            </section>
            <section className="Review-container">
                <SpotDetailSnippet className="large-snippet"/>
                {sessionUser && 
                    !spotIsOwnedBySession && 
                    !hasUserPostedReview &&
                    (<button onClick={() => setModalContent(<ReviewFormModal spotId={spot.id} />)}
							className='basic small'
                    >
							Post Your Review
					</button>)
                }
                <ReviewList reviews={spotReviews} />
            </section>
        </div>
    );
};

export default SpotDetail;




/******************** *************************************************************/


// // GOOOOOOOD COOOOODE!!!

// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import ReserveButton from "./ReserveButton";
// import { fetchSpot } from "../../store/spots";
// import { fetchSpots } from "../../store/spots";
// import { fetchReviewsBySpotId } from "../../store/reviews";
// import { SpotDetailSnippet } from "../SpotDetailSnippet";
// import { ReviewList } from "../ReviewList";
// import "./SpotDetail.css";

// const SpotDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     // Select spot and other data from Redux
//     const spot = useSelector((state) => state.spots.spots[id]);
//     const owners = useSelector((state) => state.spots.Owners || {});
//     const sessionUser = useSelector((state) => state.session.user);

//     const spotImages = useSelector((state) => 
//         Object.values(state.spots.SpotImages || {}).filter(
//             (image) => image.ownerID === parseInt(id, 10)
//         )
//     );

//     const spotReviews = useSelector((state) =>
//         Object.values(state.reviews.reviews || {}).filter(
//             (review) => review.spotId === parseInt(id, 10)
//         )
//     );

//     const currentState = useSelector((state) => state);
//     console.log("1 - currentState: ", currentState)

//     const currentSpots = useSelector((state) => state.spots);
//     console.log("2 - current spots: ", currentSpots)

//     const currentSpotsSpots = useSelector((state) => state.spots.spots[id]);
//     console.log("3 - current spots spots: ", currentSpotsSpots)


//     console.log("4 - target Spot: ", spot);

//     useEffect(() => {
//         dispatch(fetchSpots());
//         //console.log("Re-rendering fetchspots from homepage")
//     }, [dispatch]);
    
//     // Fetch spot and reviews on mount or when `id` changes
//     useEffect(() => {
//         dispatch(fetchSpot(id));
//         dispatch(fetchReviewsBySpotId(id));
//     }, [dispatch, id]);

//     if (!spot) return <p>Spot not found or loading...</p>;

//     // Show loading state if spot data is missing
//     // if (!spot || !spot.SpotImages) {
//     //     return <p>Loading spot details...</p>;
//     // }

//     const owner = owners ? owners[spot.ownerId] : null;
//     const spotIsOwnedBySession =
//         sessionUser && spot.ownerId === sessionUser.id;

//     return (
//         <div className="overview-container">
//             <section className="header">
//                 <h2>{spot.name}</h2>
//                 <h5>
//                     {spot.city}, {spot.state}, {spot.country}
//                 </h5>
//             </section>
//             <section className="gallery">
//                 <div>
//                     <img
//                         src={spot.previewImage || ""}
//                         alt="Main spot image"
//                     />
//                 </div>
//                 {/* <div className="pic-box">
//                     {spot.SpotImages &&
//                         Object.values(spot.SpotImages).slice(0, 4).map((image, index) => (
//                             <img key={index} src={image.url} alt={`Image ${index + 1}`} />
//                         ))}
//                 </div> */}
//                 <div className="pic-box">
//                     { spotImages &&
//                         spotImages.slice(0, 4).map((image, index) => (
//                             <img key={index} src={image.url} alt={`Image ${index + 1}`} />
//                         ))}
//                 </div>
//             </section>
//             <section className="details">
//                 <div className="blurb">
//                     <h3>
//                         Hosted by {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown Host"}
//                     </h3>
//                     <p>{spot.description}</p>
//                 </div>
//                 <div className="reserve">
//                     <ReserveButton />
//                 </div>
//             </section>
//             <section className="Review-container">
//                 <SpotDetailSnippet />
//                 {sessionUser && !spotIsOwnedBySession && <button>Add Review</button>}
//                 <ReviewList reviews={spotReviews} />
//             </section>
//         </div>
//     );
// };

// export default SpotDetail;





// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import ReserveButton from "./ReserveButton";
// import { fetchSpot, fetchSpots } from "../../store/spots";
// import { fetchReviewsBySpotId } from "../../store/reviews";
// import {SpotDetailSnippet} from "../SpotDetailSnippet";
// import {ReviewList} from "../ReviewList";
// import "./SpotDetail.css"

// const SpotDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     console.log("IN SPOT DETAIL, WHAT DOES STATE SHAPE LOOK LIKE?!")

//     const currentState = useSelector((state) => state);
//     console.log("1 - currentState: ", currentState)

//     const currentSpots = useSelector((state) => state.spots);
//     console.log("2 - current spots: ", currentSpots)

//     const currentSpotsSpots = useSelector((state) => state.spots.spots[id]);
//     console.log("3 - current spots spots: ", currentSpotsSpots)


//     const spot = useSelector((state) => state.spots.spots[id]);
//     console.log("4 - target Spot: ", spot);
//     const owners = useSelector((state) => state.spots.Owners);
//     const sessionUser = useSelector((state) => state.session.user);
//     const spotReviews = useSelector((state) =>
//         Object.values(state.reviews.reviews || {}).filter((review) => review.spotId === parseInt(id, 10))
//     );

//     // useEffect(() => {
//     //     if (!spot) {
//     //         dispatch(fetchSpots());
//     //         dispatch(fetchSpot(id));
//     //     }
//     //     if (!spotReviews.length) {
//     //         dispatch(fetchReviewsBySpotId(id));
//     //     }
//     // }, [dispatch, id, spot, spotReviews.length]);

//     // useEffect(() => {
//     //     dispatch(fetchSpots());
//     // },[])

//     useEffect(() => {
//         if (!spot) {
//            dispatch(fetchSpot(id));
//         }
//             dispatch(fetchReviewsBySpotId(id));
//     }, [dispatch, spot]);

//     if (!spot) return <p>Spot not found or loading...</p>;

//     const owner = owners ? owners[spot.ownerId] : null;
//     const spotIsOwnedBySession = sessionUser && spot.ownerId === sessionUser.id;

//     console.log("5 - mapping over spot.SpotImages")

//     return (
//         <div className="overview-container">
//             <section className="header">
//                 <h2>{spot.name}</h2>
//                 <h5>{spot.city}, {spot.state}, {spot.country}</h5>
//             </section>
//             <section className="gallery">
//                 <div>
//                     <img src={spot.previewImage || ""} alt="Main spot image" />
//                 </div>
//                 <div className="pic-box">
//                     {spot.SpotImages && spot.SpotImages.slice(0, 4).map((image, index) => (
                        
//                         <img key={index} src={image.id.url} alt={`Image ${index + 1}`} />
//                     ))}
//                 </div>
//             </section>
//             <section className="details">
//                 <div className="blurb">
//                     <h3>Hosted by {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown Host"}</h3>
//                     <p>{spot.description}</p>
//                 </div>
//                 <div className="reserve">
//                     <ReserveButton />
//                 </div>
//             </section>
//             <section className="Review-container">
//                 <SpotDetailSnippet />
//                 {sessionUser && !spotIsOwnedBySession && <button>Add Review</button>}
//                 <ReviewList reviews={spotReviews} />
//             </section>
//         </div>
//     );
// };

// export default SpotDetail;
