import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPOT = 'spots/LOAD_SPOT';
export const ADD_SPOT = 'spots/ADD_SPOT';
export const ADD_IMAGE = 'spots/ADD_IMAGE';
export const EDIT_SPOT = 'spots/EDIT_IMAGE';

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots, // Normalized spots object
});

export const loadSpot = (spotDetail) => ({
  type: LOAD_SPOT,
  payload: spotDetail, // Normalized spot data with SpotImages and Owner
});

export const addSpot = (newSpot) => ({
  type: ADD_SPOT,
  payload: newSpot,
});

export const addImage = (image) => ({
	type: ADD_IMAGE,
	payload: image,
});

export const editSpot = (spot) => ({
  type: EDIT_SPOT,
  payload: spot
})

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

// Supports Create Spot Thunk
    // Helper function transforms POST response to proper redux store shape
const normalizeNewSpotShape = (spotData) => {
  console.log("*****INSIDE NORMALIZE NEW SPOT SHAPE*****");
  const normalizedResponse = {
    spots: {
      [spotData.id]: {
        id: spotData.id,
        name: spotData.name,
        city: spotData.city,
        state: spotData.state,
        country: spotData.country,
        description: spotData.description,
        price: parseFloat(spotData.price),
        ownerId: spotData.ownerId,
        avgRating: null, // Default value until reviews are added *EDGE CASE, WHAT IF THE FIRST REVIEW IS A ZERO RATING
        previewImage: null, // Default value until images are added
      },
    },
    SpotImages: {}, // Empty object, will be populated later
    Owners: {
      [spotData.ownerId]: {
        id: spotData.ownerId,
      },
    }, // Empty object, will be populated later
  };
  console.log("---> normalized new spot data: ", normalizedResponse);
  console.log("*****END OF normalizeNewSpotShope*****");
  return normalizedResponse;
};

// Supports Update Spot Thunk
    // Helper function transforms PUT response to proper redux store shape
const normalizePutSpotShape = (spotData) => {
  console.log("*****INSIDE NORMALIZE NEW SPOT SHAPE*****");
  const normalizedPutResponse = {
    spots: {
      [spotData.id]: {
        id: spotData.id,
        name: spotData.name,
        city: spotData.city,
        state: spotData.state,
        country: spotData.country,
        description: spotData.description,
        price: parseFloat(spotData.price),
        ownerId: spotData.ownerId,
        //avgRating: null, // Default value until reviews are added *EDGE CASE, WHAT IF THE FIRST REVIEW IS A ZERO RATING
        //previewImage: null, // Default value until images are added
      },
    },
    SpotImages: {}, // Empty object, will be populated later
    Owners: {}, // Empty object, will be populated later
  };
  console.log("---> normalized edit spot data: ", normalizedPutResponse);
  console.log("*****END OF normalizeNewPutSpotShape*****");
  return normalizedPutResponse;
};
export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();

    // Normalize SpotImages
    const normalizedSpotImages = {};
    data.SpotImages.forEach((image) => {
        normalizedSpotImages[image.id] = {
          ...image,
          spotID: data.id,
          ownerID: data.ownerId
        };
    });

    // Normalize Owner
    const normalizedOwners = { [data.Owner.id]: data.Owner };

    // Normalize Spot data (excluding SpotImages and Owner)
    const { SpotImages=[], Owners={}, ...normalizedSpot } = data;

    // Add previewImage key
    normalizedSpot.previewImage = SpotImages.find((img) => img.preview)?.url || null;

    // Dispatch normalized data
    dispatch(
      loadSpot({
        spot: normalizedSpot,
        SpotImages: normalizedSpotImages,
        Owners: normalizedOwners,
      })
    );
  }
};

// Normalize POST response before dispatching to ADD_SPOT
export const createSpot = (spot) => async (dispatch) => {
  console.log("*****INSIDE CREATE SPOT THUNK!*****");
  const response = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const postSpotResponse = await response.json();
     console.log("1. postSpotResponse: ", postSpotResponse);
    const normalizedSpotResponse = normalizeNewSpotShape(postSpotResponse);
    console.log("2. normalizedSpotResponse: ", normalizedSpotResponse);
 
    dispatch(addSpot(normalizedSpotResponse));
    //dispatch(addSpot(normalizedSpot.spots[spotData.id]));
    console.log(normalizedSpotResponse);
    return normalizedSpotResponse;
  } else {
    const error = await response.json();
    throw error;
  }
}

// // export const createSpot = (spot) => async (dispatch) => {
// //   console.log("*****INSIDE CREATE SPOT THUNK!*****");
// //   try {
// //     const response = await csrfFetch(`/api/spots`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(spot),
// //     });

// //     if (response.ok) {
// //       const postSpotResponse = await response.json();
// //       console.log("1. postSpotResponse: ", postSpotResponse);

// //       const normalizedSpotResponse = normalizeNewSpotShape(postSpotResponse);
// //       console.log("2. normalizedSpotResponse: ", normalizedSpotResponse);

// //       dispatch(addSpot(normalizedSpotResponse));
// //       return normalizedSpotResponse;
// //     } else {
// //       const error = await response.json();
// //       console.error("Error during POST request:", error);
// //       return Promise.reject(error); // Ensure the error propagates if necessary
// //     }
// //   } catch (err) {
// //     console.error("Unexpected error in createSpot thunk:", err);
// //     return Promise.reject(err); // Propagate the unexpected error
// //   }
// // };

export const addImageToSpot = (newSpotId, owner, image) => async (dispatch) => {
  console.log("*****INSIDE ADD IMAGE TO SPOT!*****");
  console.log("Valid of first argument, newSpotId: ", newSpotId);
  const response = await csrfFetch(`/api/spots/${newSpotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  });

  if (response.ok) {
		const newImage = await response.json();
    console.log("Add Image To Spot post response: ", newImage);

    // Normalize image data to match Redux store shape
    const normalizedImageData = {
      spots: {},
      SpotImages: {
        [newImage.id]: {
          id: newImage.id,
          url: newImage.url,
          preview: newImage.preview,
          spotID: newSpotId,
          ownerID: owner.id
        }
      },
      Owners: {
        [owner.id]: {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName,
        },
      }
	  } 
    dispatch(addSpot(normalizedImageData));
    return normalizedImageData;
  } 
  throw new Error("Failed to add image to spot")
}

export const updateSpot = (spotId, updatedSpot) => async (dispatch) => {
  console.log("*****INSIDE UPDATE SPOT THUNK!*****");
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpot),
  });

  if (response.ok) {
    const putSpotResponse = await response.json();
     console.log("1. putSpotResponse: ", putSpotResponse);
    const normalizedPutSpotResponse = normalizePutSpotShape(putSpotResponse);
    console.log("2. normalizedPutResponse: ", normalizedPutSpotResponse);
 
    dispatch(editSpot(normalizedPutSpotResponse));
    //dispatch(addSpot(normalizedSpot.spots[spotData.id]));
    console.log(normalizedPutSpotResponse);
    return normalizedPutSpotResponse;
  } else {
    const error = await response.json();
    throw error;
  }
}

const initialState = {
  spots: {},
  SpotImages: {},
  Owners: {}
};
          
const spotsReducer = ( state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: { ...state.spots, ...action.payload} }; 
    case LOAD_SPOT:
      return {
        ...state, spots: { ...state.spots,
          [action.payload.spot.id]:{
            ...state.spots[action.payload.spot.id],   //retain existing spot data
            ...action.payload.spot                    //merge new spot data
        }},
        SpotImages: {
            ...state.SpotImages, 
            ...action.payload.SpotImages, 
        },
        Owners: {
            ...state.Owners, 
            ...action.payload.Owners, 
        },
      }
    case ADD_SPOT: {
      return {
        ...state,
        spots: {
          ...state.spots,
          ...action.payload.spots, // Merge new spot(s) into existing spots
        },
        SpotImages: {
          ...state.SpotImages,
          ...action.payload.SpotImages, // Merge new SpotImages
        },
        Owners: {
          ...state.Owners,
          ...action.payload.Owners, // Merge new Owners
        }
      }
    }
    case ADD_IMAGE: {
      return {
        ...state,
        SpotImages: {
          ...state.SpotImages,
          ...action.payload.SpotImages,
        },
        Owners: {
          ...state.Owners,
          ...action.payload.Owners
        }
      };
    }
    case EDIT_SPOT: {
			
			return newState;
		}
    default:
      return state;
  }
}
      
export default spotsReducer;









// import { csrfFetch } from "./csrf";

// export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
// export const LOAD_SPOT = 'spots/LOAD_SPOT';

// export const loadSpots = (spots) => ({
//   type: LOAD_SPOTS,
//   payload: spots, // Normalized spots object
// });

// export const loadSpot = (spotDetail) => ({
//   type: LOAD_SPOT,
//   payload: spotDetail, // Normalized spot data with SpotImages and Owner
// });

// export const fetchSpots = () => async (dispatch) => {
//   const response = await csrfFetch('/api/spots');

//   if (response.ok) {
//     const data = await response.json();

//     // Normalize spots data
//     const normalizedSpots = {};
//     data.Spots.forEach((spot) => {
//         normalizedSpots[spot.id] = spot;
//     });

//     // Dispatch normalized spots to the store
//     dispatch(loadSpots(normalizedSpots));
//   }
// };

// export const fetchSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);

//   if (response.ok) {
//     const data = await response.json();

//     // Normalize SpotImages
//     const normalizedSpotImages = {};
//     data.SpotImages.forEach((image) => {
//         normalizedSpotImages[image.id] = image;
//     });

//     // Normalize Owner
//     const normalizedOwners = { [data.Owner.id]: data.Owner };

//     // Normalize Spot data (excluding SpotImages and Owner)
//     const { SpotImages={}, Owners={}, ...normalizedSpot } = data;

//     // Add previewImage key
//     normalizedSpot.previewImage = SpotImages.find((img) => img.preview)?.url || null;

//     // Dispatch normalized data

//     console.log('API Response:', data);
//     console.log('Normalized Owners:', normalizedOwners);
//     console.log('Normalized Spot:', normalizedSpot);

//     dispatch(
//       loadSpot({
//         spots: normalizedSpot,
//         SpotImages: normalizedSpotImages,
//         Owners: normalizedOwners,
//       })
//     );
//   }
// };

// const initialState = {
//   spot: {},
//   SpotImages: {},
//   Owners: {}
// };
          
// const spotsReducer = ( state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_SPOTS:
//       return { ...state, spots: { ...state.spots, ...action.payload} }; 
//     case LOAD_SPOT:
//       return {
//         ...state, spots: { ...state.spots,
//           [action.payload.spot.id]:{
//             ...state.spots[action.payload.spot.id],   //retain existing spot data
//             ...action.payload.spot                    //merge new spot data
//         }},
//         SpotImages: {
//             ...state.SpotImages, 
//             ...action.payload.SpotImages, 
//         },
//         Owners: {
//             ...state.Owners, 
//             ...action.payload.Owners, 
//           },
//       };
//     default:
//       return state;
//   }
// }
      
// export default spotsReducer;
          
          
          
          
          
          
          
          
          
          
          


          

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