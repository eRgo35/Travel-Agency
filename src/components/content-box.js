import React from "react"
import {Link} from "react-router-dom"
const ContentBox = ({location}) => {
    return (
        <Link className="itemWrapper" to={"/"+location.country}>
            <div className="itemImgWrapper">
                <img className="itemImg" src={location.img} alt={location.country} />
            </div>
            <div className="itemTitle">{location.country}</div>
            <div className="itemSubtitle">{location.city}</div>
            <div className="itemDetails">{location.details}</div>
            <div className="itemPrice">Price: ${location.price}</div>
        </Link>
        
    );
}

export default ContentBox