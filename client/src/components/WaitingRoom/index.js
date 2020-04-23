import React from 'react';
import PlayerIcons from '../PlayerIcons';

import './WaitingRoom.css';

const WaitingRoom = ({ users }) => {


    return (
        <div className="waiting-room">
            <div>
                <h1>Waiting for your Group...</h1>
            </div>
            {users
                ? (
                    <div className="player-status">
                        <h2>
                            {users.map(({ displayName, icon, color }, index) => {
                                return (
                                    <>
                                        <div key={index}>
                                            <PlayerIcons icon={icon} color={color} />
                                        </div>
                                        <div>
                                            {displayName} has joined
                                        </div>
                                    </>
                                )
                            })}
                        </h2>
                    </div>
                )

                : null}
        </div>
    )
}

export default WaitingRoom;