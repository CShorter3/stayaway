// components/DeleteSpotModal.jsx
import { useDispatch } from "react-redux";
import { removeSpot } from "../../store/spots"; // Assuming you have a deleteSpot thunk
import { useModal } from "../../Context/Modal";

function DeleteSpotModal({ spotId }) {
    
    console.log("*****DELETE SPOT MODAL!*****");
    console.log("Value of spotId prop inherited from parent: ", spotId);
    
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(removeSpot(spotId)); // Dispatch action to delete the spot
        closeModal(); // Close modal after deletion
    };

    return (
        <div className="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <button className="delete-button" onClick={handleDelete}>
                Yes (Delete Spot)
            </button>
            <button className="keep-button" onClick={closeModal}>
                No (Keep Spot)
            </button>
        </div>
    );
}

export default DeleteSpotModal;
