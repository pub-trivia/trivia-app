import React from 'react';
import "./playerIcon.css"


const PlayerIcon = (props) => {
    const { icon, color } = props;
    const iconUrl = `${icon}.png`
    
    if (icon === "tim") {
        return (
            <div class="profile-icon">
                <img src={iconUrl} />
                <svg class="circle" fill={color || "#03E4AC"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
                <svg class="ellipse" fill={color || "#03E4AC"}>
                    <ellipse cx="100%" cy="50%" rx="100%" ry="50%" />
                </svg>
            </div>
        )
            
    } else {
        return(
            <div class="profile-icon">
                <img src={iconUrl} />
                <svg class="circle" fill={color || "#03E4AC"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
            </div>
        )   
    }
};

export default PlayerIcon;