import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPOT = 'spots/LOAD_SPOT';

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots, // Normalized spots object
});

export const loadSpot = (spotData) => ({
  type: LOAD_SPOT,
  payload: spotData, // Normalized spot data with SpotImages and Owner
});

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const data = await response.json();

    // Normalize spots data
    const normalizedSpots = {};
    data.Spots.forEach((spot) => {
        normalizedSpots[spot.id] = spot;
    });

    // Dispatch normalized spots to the store
    dispatch(loadSpots(normalizedSpots));
  }
};

export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();

    // Normalize SpotImages
    const normalizedSpotImages = {};
    data.SpotImages.forEach((image) => {
        normalizedSpotImages[image.id] = image;
    });

    // Normalize Owner
    const normalizedOwner = { [data.Owner.id]: data.Owner };

    // Normalize Spot data (excluding SpotImages and Owner)
    const { SpotImages, Owner, ...spot } = data;

    // Add previewImage key
    spot.previewImage = SpotImages.find((img) => img.preview)?.url || null;

    // Dispatch normalized data
    dispatch(
      loadSpot({
        spot,
        SpotImages: normalizedSpotImages,
        Owner: normalizedOwner,
      })
    );
  }
};

const initialState = {
  spots: {},
  SpotImages: {},
  Owners: {}
};
          
const spotsReducer = ( state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, ...action.normalSpotsObj};
    case LOAD_SPOT:
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id], // Retain existing spot data
          ...action.spot, // Merge new spot data
        },
        SpotImages: {
            ...state.SpotImages, 
            ...action.spot.SpotImages, 
          },
        Owners: {
            ...state.Owners, 
            ...action.spot.Owner, 
          },
      };
    default:
      return state;
  }
}
      
export default spotsReducer;
          
          
          
          
          
          
          
          
          
          
          


          

// // **** Action Creators ****
// export const loadSpots = (spots) => ({
//         type: LOAD_SPOTS,
//         payload: spots 
// });

// export const loadSpot = (spot) => ({
//   type: LOAD_SPOT,
//   payload: spot
// })

// // **** Thunk Action ****
// export const fetchSpots = () => async (dispatch) => {
//     console.log("Entered fetchSpots thunk!");
//     console.log("Value of dispatch at invocation: ", dispatch || "empty");
//     const response = await csrfFetch('/api/spots');
//     console.log("Fetch api response: ", response);
    
//     if(response.ok){
//         console.log("Response is ok!");
//         const data = await response.json();
//         console.log("parsed data response ", data);

//         //normalize parsed spots data
//         const normalSpotsObj = {};
//         data.Spots.forEach((spot) => {
//             normalSpotsObj[spot.id] = spot;
//         });
//         console.log("normalized data: ", normalSpotsObj);
//         dispatch(loadSpots(normalSpotsObj));
//     }
// }

// export const fetchSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);
  
//   if (response.ok) {
//     const spot = await response.json();
    
//     // Normalize SpotImages
//     const normalizedSpotImages = {};
//     for (const image of spot.SpotImages) {
//       normalizedSpotImages[image.id] = image;
//     }
    
//     // Normalize Owner
//     const normalizedOwner = { [spot.Owner.id]: spot.Owner };
    
//     // Normalize Spot - forget previewImage
//     const excludedKeys = ['SpotImages', 'Owner', 'previewImage'];
//     const normalizedSpot = {};
//     for (const key in spot) {
//       if (!excludedKeys.includes(key)) {
//         normalizedSpot[key] = spot[key];
//       }
//     }

//     // Set previewImage key manually to implement logic
//     normalizedSpot.previewImage = spot.SpotImages.find((img) => img.preview)?.url || null;
    
//     // Dispatch the normalized data
//     dispatch(loadSpot({
//       spot: normalizedSpot,            
//       SpotImages: normalizedSpotImages, 
//       Owner: normalizedOwner,       
//     })
//   );
// }
// };





// export const fetchSpot = (spotId) => async (dispatch) =>{
//   const response = await csrfFetch(`/api/spots/${spotId}`);

//   if(response.ok){
//     const spot = await response.json();
//     dispatch(loadSpot(spot));
//   } 
// }


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