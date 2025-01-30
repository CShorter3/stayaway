import { csrfFetch } from "./csrf";

// load spot's reviews
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// posting or editing single review
// export const LOAD_SPOT_REVIEW = "reviews/LOAD_REVIEW";

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
});

const addReview = (review) => {
	return {
		type: ADD_REVIEW,
		payload: review,
	};
};

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    payload: review
});

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
    console.log("inside fetch reviews by spot id!")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    
    if(response.ok){
        const data = await response.json();
        console.log("fetched data: ", data);

        // Ensure data.reviews is an array before processing
        if (!data.Reviews || !Array.isArray(data.Reviews)) {
            console.warn("No reviews found or data.reviews is not an array.");
            dispatch(
                loadReviews({
                    reviews: {},  
                    users: {},
                    reviewImages: {}
                })
            );
            return; // Exit early if there are no reviews
        }

        // Normalize entire reviews object
        const normalizedReviews = {};
        const normalizedUsers = {};
        const normalizedReviewImages = {};
        
        data.Reviews.forEach((review) => {
            
            // Enable normalization by flattening nested objects and including
            // foreign keys that link to all slices of Reviews state.
            normalizedReviews[review.id] = {
                ...review,
                userId: review.User.id || review.userId,  // flattened, foreign key
                spotId: review.spotId  || review.Spot.id  // created foregin key
            };
            
            // Normalize flattened User Object - creator of review
            normalizedUsers[review.User.id] = review.User;
            
            // Normalize flattened ReviewImages Object
            review.ReviewImages.forEach((image) => {
                normalizedReviewImages[image.id] = image;
            });

        });

        console.log("Normalized reviews:", normalizedReviews);
        console.log("Normalized users:", normalizedUsers);
        console.log("Normalized reviewImages:", normalizedReviewImages);


        dispatch(
            loadReviews({
                reviews: normalizedReviews || {},
                users: normalizedUsers || {},
                reviewImages: normalizedReviewImages || {}
            })
        );
    }
}

export const addSpotReview = (review, spotId, user = null) => async (dispatch) => {
    console.log("*****INSIDE ADD SPOT REVIEW THUNK*****")
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(review),
	});
    // destructure id, userId, spotId, review, stars
    
	if (response.ok) {
        console.log("Add Spot POST response is ok!");
        const review = await response.json();

    // {
    //   "id": 1,
    //   "userId": 1,
    //   "spotId": 1,
    //   "review": "This was an awesome spot!",
    //   "stars": 5,
    //   "createdAt": "2021-11-19 20:39:36",
    //   "updatedAt": "2021-11-19 20:39:36"
    // }
        console.log("Fetched Add Spot POST data: ", review);

        // check how redux handles reducer merging with null values
        const normalizeReviewData = {
            reviews: {
                [review.id]: {
                    id: review.id,
                    userId: review.userId,
                    spotId: review.spotId,
                    spotID: review.spotId,
                    review: review.review,
                    stars: review.stars,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt
                }
            },
            users: {
                [review.userId]: {
                    id: review.userId,
                    firstName: user.firstName || null,
                    lastName: user.lastName || null
                }
            },
            reviewImages: {}
        }

        console.log("Fetched data, normalized: ", normalizeReviewData);

		dispatch(addReview(normalizeReviewData));
		return review;
	}

};

export const removeReview = (reviewId) => async (dispatch) => {
    console.log("*****INSIDE DELETE SPOT THUNK!*****");
    // consider how SpotImages with the unique key
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Value of fetched response data to delete: ", response);
  
      if (response.ok) {
        dispatch(deleteReview(reviewId));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete review:", errorData);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

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
        case ADD_REVIEW: {
            return { ...state,
                reviews: { ...state.reviews, ...action.payload.reviews },
                users: { ...state.users, ...action.payload.users },
                reviewImages: { ...state.reviewImages, ...action.payload.reviewImages }
            }
        }
        case DELETE_REVIEW: {
            const newState = { 
                ...state, 
                reviews: { ...state.reviews }
            };
            delete newState.reviews[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;

