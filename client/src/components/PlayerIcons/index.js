import React, { useRef } from "./node_modules/react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./playerIcon.css"


function PlayerIcon() {
    const [state, dispatch] = useStoreContext();

    return () {

        if ({ iconUrl } === tim.png) {
            <div class="profile-icon">
                <img src={iconUrl} />
                <svg class="circle" fill={iconColor || "#03E4AC"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
                <svg class="ellipse" fill={iconColor || "#03E4AC"}>
                    <ellipse cx="100%" cy="50%" rx="100%" ry="50%" />
                </svg>
            </div>
        } else {
            <div class="profile-icon">
                <img src={iconUrl} />
                <svg class="circle" fill={iconColor || "#03E4AC"}>
                    <circle cx="50%" cy="50%" r="50%" />
                </svg>
            </div>
        }

    };
};

export default PlayerIcon;