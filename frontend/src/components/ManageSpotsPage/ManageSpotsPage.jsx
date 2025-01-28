import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ManageTile } from '.';
import { fetchSpots } from '../../store/spots';

// HomePage will dynamically populate the grid with spot tiles
function ManageSpotsPage() {
    const dispatch = useDispatch();

    // Get the current session user's ID
    const sessionUserId = useSelector((state) => state.session.user.id);

    // Get the spots slice of state
    const stateSpots = useSelector((state) => state.spots.spots);

    // Filter spots owned by the current session user
    const sessionUserSpots = Object.values(stateSpots || {}).filter(
        (spot) => spot.ownerId === parseInt(sessionUserId, 10)
    );

    // Check if the user owns any spots
    const userSpotsFullfilled = sessionUserSpots.length > 0;

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <div className="manage-spots-container">
            <h1>Manage Your Spots</h1>
            {userSpotsFullfilled ? (
                <div className="tiles-grid">
                    {sessionUserSpots.map((spot) => (
                        <ManageTile key={spot.id} spot={spot} />
                    ))}
                </div>
            ) : (
                <button>Create A Spot</button>
            )}
        </div>
    );
}

export default ManageSpotsPage;
