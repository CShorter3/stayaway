export const LOAD_SPOTS = 'spots/LOAD_REPORTS';

// **** Action Creators ****
export const loadSpots = (spots) => {
    //type: LOAD_SPOTS,
    spots 
}

// **** Thunk Actions ****
export const fetchSpots = () => async (dispatch) => {
    console.log("Entered fetchSpots thunk!");
    console.log("Value of dispatch at invocation: ", dispatch);
    const response = await fetch('/api/spots');
    console.log("Fetch api regquest: ", response);
    const spots = await response.json();
    console.log("Spots recieved: ", spots);

    // write remaining thunk ...
}

// const initialState = {};

// const spotsReducer = ( state = initialState, action) => {
//     switch (action.type) {
//         case LOAD_SPOTS:
//             return { ...initialState, spots};
//             // write reminaing reducer...
//         default:
//             return state;
//     }
// }

// export default spotsReducer;




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