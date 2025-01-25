import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Remaining spot fields
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        name: '',
        price: '',
        image0: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    });

    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        const newErrors = {};

        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.address) newErrors.address = 'Street Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (formData.description.length < 30) newErrors.description = 'Description needs 30 or more characters';
		if (!formData.name) newErrors.name = 'Title is required';
        if (!formData.price) newErrors.price = 'Price per night is required';
        //if (!formData.image1) newErrors.image1 = 'Preview Image URL is required';

        setErrors(newErrors);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        console.log('Form submitted', formData);
        console.log('Errors:', errors); 

        if (Object.keys(errors).length > 0) {
            return;
        }

        const spotData = {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            description: formData.description,
            name: formData.name,
            price: parseInt(formData.price),
        };

        // console.log('Form submitted', formData);
        // console.log('Errors:', errors);

        const newSpot = await dispatch(createSpot(spotData));

        if (newSpot) {
            console.log("Response is valid!");
            console.log('Form submitted: ', formData);
            console.log('Errors: ', errors);

            // const serveSpotImages = [
            //     { url: formData.image1, preview: true },
            //     { url: formData.image2, preview: false },
            //     { url: formData.image3, preview: false },
            //     { url: formData.image4, preview: false },
            //     { url: formData.image5, preview: false },
            // ].filter((image) => image.url);

            // await Promise.all(
            //     serveSpotImages.map((image) => dispatch(addImageToSpot(newSpot.id, image)))
            // );

            //navigate(`/spots/${newSpot.spots.id}`);
        }
        console.log('Form submitted', formData);
        console.log('Errors:', errors);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-spot-form">
                <div className="form-header">
                    <h2>Create a New Spot</h2>
                    <h4>Where&apos;s your place located?</h4>
                    <p>
                        Guests will only get your address once they&apos;ve booked a reservation.
                    </p>
                </div>

                <div className="form-body">
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

                    <div className="share-city-state-row">
                        <div>
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

                        <div>
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
                <hr />

                <div>
                    <h4>Create a title for your spot</h4>
                    <input
                        id="name"
                        placeholder="Name of your spot"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </div>
                <hr />

                <div>
                    <h4>Set a base price for your spot</h4>
                    <label>
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
                <hr />

                <div>
                    <h4>Liven up your spot with photos</h4>
                    <input
                        id="image0"
                        placeholder="Image URL"
                        type="url"
                        value={formData.image0}
                        onChange={handleChange}
                    />
                    {hasSubmitted && errors.image0 && (
                        <p className="errors">{errors.image0}</p>
                    )}
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
                <hr />

                <button onClick={handleSubmit} type="submit" className="create-spot-btn">
                    Create Spot
                </button>

            </form>
        </div>
    );
};

export default CreateSpotForm;
