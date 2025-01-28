// import { useSelector } from "react-redux"

// const SpotDetailGallery = ({ spotId }) => {

//     const spot = useSelector((state) => state.spots.spots[spotId]);

//     if(!spot || !spot.SpotImages){
//         return <div>Loading images...</div>;
//     }

//     return (
// 		<div className="spot-images-gallery">
// 			{spot.SpotImages.map((image) => (
// 				<div className='spot-image'key={image.id}>
// 					<img className='spot-image-structure'
//                         src={image.url} 
//                         alt={`Spot image ${image.id}`}
// 					/>
// 				</div>
// 			))}
// 		</div>
// 	);

// }

// export default SpotDetailGallery;