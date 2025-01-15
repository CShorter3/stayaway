import "./Tile.css";

const Tile = ({ spot }) => {
    
    // will handle click on tile navigates to spot page
    
    render (
        /* display child elements vertically*/
        <div className="tile-container">
            /* tile image should take atleast 80% the tile container */
            <div className="tile-image"> <img src={spot.imageUrl} alt="spot image" /></div>
            // spot detail rows should take ~10% container height
            <div className="tile-detail-row">
                <p id="push-detail-left"> city, state left </p>
                <p id="push-detail-right"> spot rating right </p>
            </div>
            <div className="tile-detail-row">
            <div> /* structure details row 2*/
                <p id="push-detail-left"> price per night left </p>
            </div> 
            </div>
        </div>
    )
}

export default Tile;