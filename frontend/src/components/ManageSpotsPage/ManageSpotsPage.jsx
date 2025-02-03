import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageTile from '../ManageSpotsPage/ManageTile';
import { fetchSpots } from '../../store/spots';

// HomePage will dynamically populate the grid with spot tiles
function ManageSpotsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the current session user's ID
    const sessionUserId = useSelector((state) => state.session.user.id);

    // Get the spots slice of state
    const stateSpots = useSelector((state) => state.spots.spots);

    // Filter spots owned by the current session user
    const sessionUserSpots = Object.values(stateSpots || {}).filter(
        (spot) => spot.ownerId === parseInt(sessionUserId, 10)
    );

    const handleClick = async () => {
       navigate('/spots/new')
    };
    // Check if the user owns any spots
    const userSpotsFullfilled = sessionUserSpots.length > 0;

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch, sessionUserSpots.length]);

    return (
        <div className="manage-spots-container">
            <h1 style={{textAlign: "left", paddingBottom: "1rem"}}>Manage Your Spots</h1>
            {userSpotsFullfilled ? (
                <div className="tiles-grid">
            <button onClick={handleClick} className='basic small' id='medium' style={{marginBottom: "4rem"}}>   
                Create a New Spot
            </button>
                     {sessionUserSpots.map((spot) => (
                        <ManageTile key={spot.id} spot={spot} />
                    ))}
                </div>
            ) : (
                <button onClick={handleClick} className='create-spot-button'>   
                    Create A Spot
                </button>
            )}
        </div>
    );
}

export default ManageSpotsPage;
