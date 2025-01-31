import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSpot, updateSpot } from "../../store/spots";
import "./EditSpotForm.css";

const EditSpotForm = () => {
  console.log("*****INSIDE EDIT SPOT!*****");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const owner = useSelector((state) => state.session.user);
  // console.log("Current session user id: ", owner.id);
  // console.log("Current session names: ", owner.firstName, owner.lastName);

  const { spotId } = useParams();
  const editSpot = useSelector((state) => state.spots.spots[spotId]);

  console.log("id pulled from param: ", spotId);

  console.log("targeted spot to edit based on id: ", editSpot);

  // Remaining spot fields
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    description: "",
    name: "",
    price: "",
    // image0: '',
    // image1: '',
    // image2: '',
    // image3: '',
    // image4: '',
  });

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (editSpot) {
      setFormData({
        country: editSpot.country || "",
        address: editSpot.address || "",
        city: editSpot.city || "",
        state: editSpot.state || "",
        description: editSpot.description || "",
        name: editSpot.name || "",
        price: editSpot.price || "",
      });
    }
  }, [editSpot]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const newErrors = {};
    // MY BACKEND WILL USE PREVIOUS FIELD DATA IF NEW DATA NOT PROVIDED
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.description.length < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!formData.name) newErrors.name = "Title is required";
    if (!formData.price) {
      newErrors.price = "Price per night is required";
  } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
  }
    //if (!formData.image0) newErrors.image0 = 'Preview Image URL is required';

    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    console.log("Form data POSTED to server", formData);
    console.log("Errors:", errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const updatedSpot = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      description: formData.description,
      name: formData.name,
      price: parseInt(formData.price),
    };

    console.log("Edited Spot Data", updatedSpot);
    // console.log('Errors:', errors);

    const updatedSpotResponse = await dispatch(updateSpot(spotId, updatedSpot));

    // const newSpotId = Object.keys(newSpot.spots)[0];

    console.log(
      "Value of new spot returned from update spot thunk: ",
      updatedSpotResponse
    );
    // console.log("Value of newSpotId: ", newSpotId);
    //console.log("Value of newSpotId: ", newSpotId);

    // EDITING IMAGE DETAILS IS OPTIONAL FOR MVP
    if (updatedSpotResponse) {
      //     console.log("*****INSIDE CREATE SPOT IF BLOCK!*****");
      //     console.log('Form submitted: ', formData);
      //     console.log('Errors: ', errors);
      console.log("inside response if block");
      //     // Return array where image.url is valid
      //     const serveSpotImages = [
      //         { url: formData.image0, preview: true },
      //     //  { url: formData.image1, preview: false },
      //     //  { url: formData.image2, preview: false },
      //     //  { url: formData.image3, preview: false },
      //     //  { url: formData.image4, preview: false },
      //     ].filter((image) => image.url);

      //     await Promise.all(
      //         serveSpotImages.map((image) => dispatch(addImageToSpot(newSpotId, owner, image)))
      //     );

      navigate(`/spots/${spotId}`);
    }
    console.log("outside response if block");
  };

  return (
    <form onSubmit={handleSubmit} className="create-spot-form">
      <div className="head-unit">
        <h1>Update your Spot</h1>
        <h4>Where&apos;s your place located?</h4>
        <p>
          Guests will only get your address once they&apos;ve booked a
          reservation.
        </p>
      </div>

      <div className="form-unit">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          placeholder="Country"
          type="text"
          value={formData.country}
          onChange={handleChange}
        />
        {hasSubmitted && errors.country && (
          <p className="errors">{errors.country}</p>
        )}
      </div>

      <div className="form-unit">
        <label htmlFor="address">Street Address</label>
        <input
          id="address"
          placeholder="Street Address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        {hasSubmitted && errors.address && (
          <p className="errors">{errors.address}</p>
        )}
      </div>

      <div className="city-state-row">
        <div className="form-unit">
          <div className="split-left">
            <label htmlFor="city">City</label>
            <input
              id="city"
              placeholder="City"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
            {hasSubmitted && errors.city && (
              <p className="errors">{errors.city}</p>
            )}
          </div>
        </div>
        <div className="form-unit">
          <div className="split-right">
            <label htmlFor="state">State</label>
            <input
              id="state"
              placeholder="State"
              type="text"
              value={formData.state}
              onChange={handleChange}
            />
            {hasSubmitted && errors.state && (
              <p className="errors">{errors.state}</p>
            )}
          </div>
        </div>
      </div>
      <hr />

      <div>
        <h4>Describe your place to guests</h4>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          id="description"
          placeholder="Please write at least 30 characters"
          value={formData.description}
          onChange={handleChange}
        />
        {hasSubmitted && errors.description && (
          <p className="errors">{errors.description}</p>
        )}
      </div>

      <div>
        <h4>Create a title for your spot</h4>
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special
        </p>
        <input
          id="name"
          placeholder="Name of your spot"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && <p className="errors">{errors.name}</p>}
      </div>

      <div>
        <h4>Set a base price for your spot</h4>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>
        <label className="one-row">
          $
          <input
            id="price"
            placeholder="Price per night (USD)"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        {hasSubmitted && errors.price && (
          <p className="errors">{errors.price}</p>
        )}
      </div>
      <hr/>

      {/* <div>
        <h4>Liven up your spot with photos</h4>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          id="image0"
          placeholder="Image URL"
          type="url"
          value={formData.image0}
          onChange={handleChange}
        />
        {hasSubmitted && errors.image0 && (
          <p className="errors">{errors.image0}</p>
        )} */}
        {/* 
                    <input
                        id="image1"
                        placeholder="Image URL"
                        type="url"
                        value={formData.image1}
                        onChange={handleChange}
                    />
                    <input
                        id="image2"
                        placeholder="Image URL"
                        type="url"
                        value={formData.image2}
                        onChange={handleChange}
                    />
                    <input
                        id="image3"
                        placeholder="Image URL"
                        type="url"
                        value={formData.image3}
                        onChange={handleChange}
                    />
                    <input
                        id="image4"
                        placeholder="Image URL"
                        type="url"
                        value={formData.image4}
                        onChange={handleChange}
                    />
                    
      </div>
*/}
      <button
        onClick={handleSubmit}
        type="submit"
        className="small bi"
        id="center"
        style={{marginTop: "0.5rem"}}
      >
        Update your Spot
      </button>
    </form>
  );
};

export default EditSpotForm;
