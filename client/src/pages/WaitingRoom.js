import React from 'react';
import Joined from '../components/Joined';

const WaitingRoom = () => [
    <div>
        <h1>Waiting for your Group...</h1>
        //create list of users who have joined
        <Joined />
        //button with start game or "everyone's here"
        <GameButton />
    </div>
]