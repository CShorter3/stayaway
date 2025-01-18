import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

export const loadReviews = (spotId, reviews) => ({
    type: LOAD_REVIEWS,
    payload: { spotId, reviews }
});