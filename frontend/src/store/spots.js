import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPOT = 'spots/LOAD_SPOT';


// **** Action Creators ****
export const loadSpots = (normalSpotsObj) => ({
        type: LOAD_SPOTS,
        normalSpotsObj 
});

export const loadSpot = (spot) => ({
  type: LOAD_SPOTS,
  spot
})

// **** Thunk Actions ****
export const fetchSpots = () => async (dispatch) => {
    console.log("Entered fetchSpots thunk!");
    console.log("Value of dispatch at invocation: ", dispatch || "empty");
    const response = await csrfFetch('/api/spots');
    console.log("Fetch api response: ", response);
    
    if(response.ok){
        console.log("Response is ok!");
        const data = await response.json();
        console.log("parsed data response ", data);

        //normalize parsed spots data
        const normalSpotsObj = {};
        data.Spots.forEach((spot) => {
            normalSpotsObj[spot.id] = spot;
        });
        console.log("normalized data: ", normalSpotsObj);
        dispatch(loadSpots(normalSpotsObj));
    }
}

export const fetchSpot = (spotId) => async (dispatch) =>{
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if(response.ok){
    const spot = await response.json();
    dispatch(loadSpot(spot));
  } 
}

const initialState = {};

const spotsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return { ...state, ...action.normalSpotsObj};
        case LOAD_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        default:
            return state;
    }
}

export default spotsReducer;




// **** Spots Object ****

/*
{
    "Spots": [
      {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      },
      {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      }, 
    ]
  }
*/