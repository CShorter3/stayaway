import { csrfFetch } from './csrf';

// Extracts action types into a constant. For session reducer and action use.
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

// thunk action to authroize login
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    try{
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({
                credential,
                password
            })
        });
        
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        
        // send data to Redux store
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    } catch(error){
        console.log("invalid credentials: ", error);
        throw Error;
    }
}

// Thunk action to restore session user
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

// Thunk action to sign up user
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

// Thunk logs out curent user
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', { method: "DELETE" });
    dispatch(removeUser());
    return response;
};


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

export default sessionReducer;