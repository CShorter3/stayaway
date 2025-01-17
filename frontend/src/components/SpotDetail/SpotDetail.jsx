// Spot detail will present a detailed view of one spot
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReserveButton from "./ReserveButton";
import { fetchSpot } from "../../store/spots";
import './SpotDetail.css';

// const getOwnersOfSpot = (spotId) => {
    
//     const spot = useSelector((state) => state.spots.spots[spotId]);  // Grabbing target spot's object
//     console.log("Targeted spot object: ", spot);
//     const owners = useSelector((state) => state.spots.Owners);       // Grabbing owners object
    
//     if (!spot || !owners) return [];  // Handling edge cases where data may not be available
    
//     // Convert owners object to an array and filter owners who match the spot's ownerId
//     return spotOwners; 
// };

const SpotDetail = () => {
    
    console.log("Enter SpotDetail Component!")
    
    const { id } = useParams();
    const dispatch=useDispatch();
    
    const spot = useSelector((state) => state.spots.spots[id]);          // expect to grab target spot's object from store
    const owners = useSelector((state) => state.spots.Owners);               // expect to grab spot owners object from store
    
    // necessary logic for future functionality and scalability where mutliple users can one one spots 
    // const spotOwners = Object.values(owners).filter((owner) => owner.id === spot.ownerId);
    const owner= owners && spot ? Object.values(owners).find((owner) => owner.id === spot.ownerId) : null;

    useEffect(() => {
        if(!spot) {
            dispatch(fetchSpot(id));
        }
    }, [dispatch, id, spot]);

    // const getSpotOwners = () => {
    //     return useSelector((state) => {
    //     console.log("Redux state:", state);                          // expect entire state
    //     console.log("Redux state.spots: ", state.spots);             // expect Spots slice of state
    //     console.log("Redux state.spots.Owner: ", state.spots.Owner); // expect access to Owner details
    //     const owners = Object.values(state.spots.Owners || {});
    //     return owners; 
    // }   

    if(!spot) return <p>spot not found</p>;

    const spotImages = spot.SpotImages ? Object.values(spot.SpotImages) : [];

    return (
        /* displays content vertically */
        <div className="overview-container">
            {/* Header section's children are stacked and aligned left*/}
            <section className="header">
                <h2>{spot.name}</h2>
                <h5>{spot.city}, {spot.state}, {spot.country}</h5>
            </section>
            {/*Gallery section displays 1 pic in left half of width, next 4 in second half of width*/}
            <section className="gallery">
                {/*Image uses the first pic-box's entire width and height*/}
                <div>
                    <img src={spot.previewImage || ""} alt="Main spot image" />
                </div>
                {/*Each image uses a quarter of the second pic-box's width and height*/}
                <div className="pic-box">
                    {spotImages.slice(0, 4).map((image, index) => (
                        <img key={index} src={image.url} alt={`image ${index + 1}`} />
                    ))}
                </div>
            </section>
            {/* The details section display its children horizontally*/}
            <section className="details">
                {/* blurb uses 2/3 of detail sections width */}
                <div className="blurb">
                    <h3>Hosted by {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown Host"}</h3>
                    <p>{spot.description}</p>
                </div>
                {/* blurb uses 1/3 of detail sections width */}
                <div className="reserve">
                    <ReserveButton/>
                </div>
                <hr/>
            </section>
        </ div>
    );

};

export default SpotDetail;