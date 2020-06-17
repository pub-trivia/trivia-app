import React from 'react';
import "./playerIcon.css"


const PlayerIcon = (props) => {
    const { icon, color } = props;
    let iconUrl = `/assets/${icon}.png`
    
    if(!icon){
        iconUrl = '/assets/puppy.png'
    } 

    if (icon === "tim") {
        return (
            <div className="profile-icon">
                <img src={iconUrl} alt={`${icon} avatar`} />
                <svg className="circle" fill={color || "#04D5FB"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
                <svg className="ellipse" fill={color || "#04D5FB"}>
                    <ellipse cx="100%" cy="50%" rx="100%" ry="50%" />
                </svg>
            </div>
        )

    } else {
        return (
            <div className="profile-icon">
                <img src={iconUrl} alt={`${icon} avatar`} />
                <svg className="circle" fill={color || "#04D5FB"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
            </div>
        )
    }
};

export default PlayerIcon;