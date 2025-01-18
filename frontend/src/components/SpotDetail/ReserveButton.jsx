import { useAlert } from 'react-alert'
import { SpotDetailSnippet } from '../SpotDetailSnippet';

const ReserveButton = () => {

    const alert = useAlert();

    // handle reserve button click, returns alert "Feature coming soon" alert.
    const handleClick = (e) => {
        alert.show("Feature coming soon...");
        console.log("alert triggered, should show: ", e.target)
    }

    // handle revies click, jump to reviews

    return (
        <div className="reserve-btn-container">
            {/* button content child divs display side by side in one row*/}
            <div className="btn-content">
                {/* price-block elements are aligned left of btn content*/}
                <div className="price-block">
                    <h5>$123.45 </h5><span>night</span>
                </div>
                {/* price-block elements are aligned right of btn content*/}
                <div className="reputation-block">
                    <SpotDetailSnippet/>
d                </div>
            </div>
            <button onClick={handleClick}>
                Reserve
            </button>
        </div>
    )
}

export default ReserveButton;