const Tile = ({ spot }) => {
    
    
    render (
        <div className="tile-container">
            <div className="tile-image"> image </div>
            <div> /* structure details row 1*/
                <p> city, state left </p>
                <p> spot rating right </p>
            </div> 
            <div> /* structure details row 2*/
                <p> price per night left </p>
            </div> 
        </div>
    )
}