import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Tile } from '.';
import "./HomePage.css";
import { fetchSpots } from '../../store/spots';

// HomePage will dynamically populate the grid with spot tiles
function HomePage(){
    const dispatch = useDispatch();
    // access normalized spots object from store
    const spots = useSelector((state) => Object.values(state.spots));

    // listen for spots slice of state changes
    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <div className="tiles-grid">
            {spots.map((spot) => (
                <Tile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default HomePage;