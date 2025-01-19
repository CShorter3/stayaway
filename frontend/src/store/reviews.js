import { csrfFetch } from "./csrf";

// load spot's reviews
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

// posting or editing single review
// export const LOAD_SPOT_REVIEW = "reviews/LOAD_REVIEW";

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
});

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
    console.log("inside fetch reviews by spot id!")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    
    if(response.ok){
        const data = await response.json();
        console.log("fetched data: ", data);

        // Ensure data.reviews is an array before processing
        // if (!data.reviews || !Array.isArray(data.reviews)) {
        //     console.warn("No reviews found or data.reviews is not an array.");
        //     dispatch(
        //         loadReviews({
        //             reviews: {},  
        //             users: {},
        //             reviewImages: {}
        //         })
        //     );
        //     return; // Exit early if there are no reviews
        // }

        // Normalize entire reviews object
        const normalizedReviews = {};
        const normalizedUsers = {};
        const normalizedReviewImages = {};
        
        data.reviews.forEach((review) => {
            
            // Enable normalization by flattening nested objects and including
            // foreign keys that link to all slices of Reviews state.
            normalizedReviews[review.id] = {
                ...review,
                userId: review.User.id,             // flattened, foreign key
                spotId: review.Spot?.id || spotId   // created foregin key
            };
            
            // Normalize flattened User Object - creator of review
            normalizedUsers[review.User.id] = review.User;
            
            // Normalize flattened ReviewImages Object
            review.ReviewImages.forEach((image) => {
                normalizedReviewImages[image.id] = image;
            });

        });

        dispatch(
            loadReviews({
                reviews: normalizedReviews,
                users: normalizedUsers,
                reviewImages: normalizedReviewImages
            })
        );
    }
}

// **** Thunks ****
const initialState = { 
    reviews: {},
    users: {},
    reviewImages: {} 
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_REVIEWS: {
            return { ...state,
                reviews: { ...state.reviews, ...action.payload.reviews },
                users: { ...state.users, ...action.payload.users },
                reviewImages: { ...state.reviewImages, ...action.payload.reviewImages }
            }
        }
        default:
            return state;
    }
}

export default reviewsReducer;