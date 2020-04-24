import React, { useEffect } from 'react';
import { ws } from '../components/socket';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import WaitingRoom from '../components/WaitingRoom';
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';
import { SET_USERS } from '../utils/actions';

const Wait = () => {
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    const { game, name, icon, color, users } = state;

    useEffect(() => {
        ws.emit('join', { game, name, icon, color }, () => { });
    }, []);

    useEffect(() => {
        ws.on("gameData", ({ users }) => {
            dispatch({
                type: SET_USERS,
                post: {
                    users: users
                }
            })
        })

        ws.on("startGame", ({ game, users }) => {
            history.push('/game');
        })
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        ws.emit("allHere", { game }, () => { });
    }


    return (
        <div id="home">
            <div className="row">
                <div className="col header">
                    <Header />
                </div>
                <div className="col">
                    <h2>You're in game: {game}</h2>
                    <WaitingRoom users={users} />
                    <Button type="submit" text="EVERYONE IS HERE" handleClick={(event) => handleClick(event)} />
                </div>
            </div>
        </div>
    )
}

export default Wait;