import "./Tile.css";

const Tile = ({ spot }) => {
    
    // will handle click on tile navigates to spot page
    
    return (
        /* display child elements vertically*/
        <div className="tile-container">
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
        </div>
    );
}

export default Tile;