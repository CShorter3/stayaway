import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { StarRatingSlider } from '../StarRatingSlider';
import { addSpotReview } from '../../store/reviews';

//import './ReviewFormModal.css';

const ReviewFormModal = ({ spotId }) => {
    console.log("***** INSIDE REVIEW FORM MODAL *****")
    console.log("Value of inherited spotId: ", { spotId })
    console.log("Value of inherited spotId: ", spotId)

	// Provides access to session user data
	const user = useSelector(state => state.session.user || null);
	console.log("Current user creating review: ", user)

    const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(0);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("submit review triggered: ", e.target)

		const newErrors = {};

		if (review.length < 10)
			newErrors.review = 'Review must be at least 10 characters long';
		if (stars < 1 || stars > 5)
			newErrors.stars = 'Stars must be between 1 and 5';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
	
	try {
		await dispatch(addSpotReview({ review, stars }, spotId, user));
		closeModal();
	} catch (error) {
		setErrors({ submit: 'Failed to submit review. Please try again.' });
	}
};

    return (
		<div>
			<h2 className='review-title-form'>How was your stay?</h2>
			<form onSubmit={handleSubmit}>
				<textarea
					placeholder='Leave your review here...'
					className='review-textarea'
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
				/>
				{errors.review && <p className='error-message'>{errors.review}</p>}
				<label className='stars-label'>
					<StarRatingSlider
						rating={stars}
						setRating={setStars}
					/>
					<span>Stars</span>
				</label>
				{errors.stars && <p className='error-message'>{errors.stars}</p>}
				<button
					type='submit'
					disabled={review.length < 10 || stars < 1}
				>
					Submit Review
				</button>
			</form>
		</div>
	);
};

export default ReviewFormModal;