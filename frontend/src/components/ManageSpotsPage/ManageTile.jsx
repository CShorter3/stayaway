import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FaStar } from 'react-icons/fa';
import "./ManageTile.css";

const ManageTile = ({ spot }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/spots/${spot.id}`);
    };

    const tooltipId = `tooltip-${spot.id}`;

    return (
        <div className="tile-container" onClick={handleClick} data-tooltip-id={tooltipId}>
            <div className="tile-image">
                <img src={spot.previewImage} alt={spot.name} />
            </div>
            <div className="tile-detail-row">
                <p id="push-detail-left">{spot.city}, {spot.state}</p>
                <p id="push-detail-right"><FaStar className="star"/> {spot.avgRating ?? "New"}</p>
            </div>
            <div className="tile-detail-row">
                <p id="push-detail-left">${spot.price} <span>night</span></p>
            </div>
            <div className="manage-action-row">
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <Tooltip
                id={tooltipId}
                place="center"
                variant="info"
                content={spot.name}
            />
        </div>
    );
};

export default ManageTile;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// //import { fetchReviewsBySpotId } from "../../store/reviews";
// import { fetchSpot } from "../../store/spots";
// import { useNavigate } from "react-router-dom";
// import { Tooltip } from "react-tooltip";
// //import "./Tile.css";

// const Tile = ({ key }) => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // const [avgRating, setAvgRating] = newStat("New")

//     const spot = useSelector((state) => state.spots.spots[key]);
//     // console.log("Enters Tile component for current spot: ", spot);
//     // console.log("Curent spot's spot.id: ", spot.id);
    
//     useEffect(() => {
//         if(!spot || !spot.avgRating) {
//             dispatch(fetchSpot(spot.id));
//         }
//     }, [dispatch, spot.id, spot])

//     const handleClick = () => {
//         navigate(`/spots/${spot.id}`);
//     }

//     if (!spot) return <div>Loading...</div>;

//     const tooltipId = `tooltip-${spot.id}`;

//     // NOTE: Check if necessary to parse string as INT somehow, too.
//     // ensure avgRating is a valid number
//     //const avgRating = typeof spot.avgRating === "number" 
//             //? spot.avgRating.toFixed(1) : "New";

//     return (
//         /* display child elements vertically*/
//         <div className="tile-container" onClick={handleClick} data-tooltip-id={tooltipId}>
//             {/* tile image should take atleast 80% the tile container */}
//             <div className="tile-image"> <img src={spot.previewImage} alt="spot image" /></div>
//             {/* spot detail rows should take ~10% container height */}
//             <div className="tile-detail-row">
//                 <p id="push-detail-left"> {spot.city}, {spot.state} </p>
//                 <p id="push-detail-right"> {spot.avgRating} </p>
//             </div>
//             <div className="tile-detail-row">
//             <div> {/* structure details row 2*/}
//                 <p id="push-detail-left"> ${spot.price} <span>night</span> </p>
//             </div> 
//             </div>
//             <Tooltip
//                 id={tooltipId}
//                 place="center"
//                 variant="info"
//                 content={spot.name} 
//             />
//         </div>
//     );
// }

// export default Tile;