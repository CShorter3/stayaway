import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Tile } from '.';
import { fetchSpots } from '../../store/spots';
import "./HomePage.css";

// HomePage will dynamically populate the grid with spot tiles
function HomePage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpots());
        //console.log("Re-rendering fetchspots from homepage")
    }, [dispatch]);
    
    // access normalized spots object from store
    const displaySpots = useSelector((state) => {
        // console.log("Redux state:", state);                 // Check the full Redux state structure
        // console.log("Redux state.spots: ", state.spots);
        // console.log("Redux state.spots.spots: ", state.spots.spots)
        return Object.values(state.spots.spots);
    });

    // listen for spots slice of state changes

    // If spots are not loaded yet, show loading
    if (!displaySpots || displaySpots.length === 0) {
        return <div>Loading spots...</div>;
    }

    return (
        <>
            <div>
                <h1 className='heading'> STAYAWAY! Where dystopia meets adventure.</h1>
                
            </div>


            <div className="tiles-grid">
                {displaySpots.map((spot) => {
                    // console.log("iterating over...", displaySpots);       // expect to see the same spots object with unqiue keys at each map pass
                    // console.log("current spot id: ", spot.id)   // expect spot id to be a new spot id at each map pass, which is used to key into a spot object
                    // console.log("current spot object: ", spot)   // expect spot to be a new spot object that maps to a unique spots object key
                    return <Tile key={spot.id} spot={spot} />
                })}
            </div>
        
        </>
    )
}

export default HomePage;