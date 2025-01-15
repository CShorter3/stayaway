// Spot detail will present a detailed view of one spot

const SpotDetail = ({ spot }) => {

    // handle lick on pics

    // handle click on reserve

    return (
        /* displays content vertically */
        <div className="overview-container">
            /* Header section's children are stacked and aligned left*/
            <section className="header">
                <h2>Spot Name</h2>
                <h5>City, State, Country</h5>
            </section>
            /*Gallery section displays 1 pic in left half of width, next 4 in second half of width*/
            <section className="gallery">
                /*Image uses the first pic-box's entire width and height*/
                <div>
                    <img src="" alt="image one" />
                </div>
                /*Each image uses a quarter of the second pic-box's width and height*/
                <div className="pic-box" id="quarter">
                    <img src="" alt="image one" />
                    <img src="" alt="image two" />
                    <img src="" alt="image three" />
                    <img src="" alt="image four" />
                </div>
            </section>
            /* The details section display its children horizontally*/
            <section className="details">
                /* blurb uses 2/3 of detail sections width */
                <div className="blurb">
                    <h3>Hosted by FirstName Lastname</h3>
                    <p>blurb</p>
                </div>
                /* blurb uses 1/3 of detail sections width */
                <div className="reserve">
                        insert reserve button component
                </div>
            </section>
            
        </ div>
    )

}