import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
//import "./Tile.css";

const Tile = ({ spot }) => {

    const navigate = useNavigate();

    // console.log("Enters Tile component for current spot: ", spot);
    // console.log("Curent spot's spot.id: ", spot.id);
    
    const handleClick = () => {
        navigate(`/spots/${spot.id}`);
    }

    if (!spot) return <div>Loading...</div>;
    
    const tooltipId = `tooltip-${spot.id}`;

    return (
        /* display child elements vertically*/
        <div className="tile-container" onClick={handleClick} data-tooltip-id={tooltipId}>
            {/* tile image should take atleast 80% the tile container */}
            <div className="tile-image"> <img src={spot.previewImage} alt="spot image" /></div>
            {/* spot detail rows should take ~10% container height */}
            <div className="tile-detail-row">
                <p id="push-detail-left"> {spot.city}, {spot.state} </p>
                <p id="push-detail-right"> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"} </p>
            </div>
            <div className="tile-detail-row">
            <div> {/* structure details row 2*/}
                <p id="push-detail-left"> ${spot.price} <span>night</span> </p>
            </div> 
            </div>
            <Tooltip
                id={tooltipId}
                place="center"
                variant="info"
                content={spot.name} 
            />
        </div>
    );
}

export default Tile;