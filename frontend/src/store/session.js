import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";

// action sets session slice of state of user to action creator's input parameter
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};


// action creates action to have reducer remove the session user