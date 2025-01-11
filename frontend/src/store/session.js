import { csrfFetch } from './csrf';

// Extracts action types into a constant. For session reducer and action use.
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
//const ADD_USER = "session/addUser";

// action sets session slice of state of user to action creator's input parameter
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

// action creates action to have reducer remove the session user
const removeUser = user => {
    return {
        type: REMOVE_USER,
    }
}

// const addUser = user => {
//     return {
//         type: ADD_USER,
//         payload: user
//     }
// }

// creates login thunk action creator - gets user from async csrfFetch
export const login = (user) => async (dispatch) => {
    // extract and populate user object f
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    // updates the store with the new user information
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

// initial state represents logged out user
const initialState = { user: null };

// manipulate current state according to action type
const sessionReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        // case ADD_USER:
        //     return { ...state, user: action.payload };
        default:
            return state;
    }
};

// creates signup thunk action creator - get user from async csfrFetch
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export default sessionReducer;