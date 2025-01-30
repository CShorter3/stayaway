// components/DeleteSpotModal.jsx
import { useDispatch } from "react-redux";
import { removeReview } from "../../store/reviews"; // Assuming you have a deleteSpot thunk
import { useModal } from "../../Context/Modal";

function DeleteReviewModal({ reviewId }) {
    
    console.log("*****DELETE REVIEW MODAL!*****");
    console.log("Value of reviewId prop inherited from parent: ", reviewId);
   
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(removeReview(reviewId)); // Dispatch action to delete the spot
        closeModal(); // Close modal after deletion
    };

    return (
        <div className="delete-review-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <button className="delete-button" onClick={handleDelete}>
            Yes (Delete Review)
        </button>
        <button className="keep-button" onClick={closeModal}>
            No (Keep Review)
        </button>
        </div>
    );
}

export default DeleteReviewModal;
