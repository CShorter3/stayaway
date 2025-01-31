
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRatingSlider.css';

const StarRatingSlider = ({ rating, setRating }) => {
	const [hover, setHover] = useState(0);

	return (
		<div className='star-rating'>
			{[...Array(5)].map((star, index) => {
				const rate = index + 1;

				return (
					<label key={index}>
						<input className='hidden'
							type='radio'
							name='rating'
							value={rate}
							onClick={() => setRating(rate)}
						/>
						<FaStar
							className='star'
							color={rate <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
							size={30}
							onMouseEnter={() => setHover(rate)}
							onMouseLeave={() => setHover(0)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRatingSlider;
