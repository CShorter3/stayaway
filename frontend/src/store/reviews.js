import { csrfFetch } from "./csrf";

// load spot's review list for detail page
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

// posting or editing single review
// export const LOAD_SPOT_REVIEW = "reviews/LOAD_REVIEW";

// load all spotId's reviews
export const loadSpotReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
});

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
            };
        };
        default:
            return state;
    }
}