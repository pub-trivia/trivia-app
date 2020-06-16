import React, { useEffect } from 'react';
import { ws } from '../components/socket';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import WaitingRoom from '../components/WaitingRoom';
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';
import { SET_USERS } from '../utils/actions';
import API from '../utils/API';

const Wait = () => {
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    const { game, users } = state;

    //general useEffect for first run
    useEffect(() => {
        if(localStorage.currentGame !== game){
            history.push('/');
        } else {
            getPlayers();
        }
    }, []);

    useEffect(() => {
        //client receives websocket for gameData
        //get all players registered to this game from the db
        //writes the array of users to state
        ws.on("gameData", () => {
           getPlayers();
        })

        //client receives websocket to start game
        //user is pushed to /game route
        ws.on("startGame", () => {
            console.log("==> on.startGame reached")
            history.push('/game');
        })
    }, []);

    const getPlayers = () => {
        API.getAllPlayers(game)
            .then(result => {
                dispatch({
                    type: SET_USERS,
                    post: {
                        users: result.data
                    }
                })
            })
    }

    const handleClick = (event) => {
        event.preventDefault();
        API.startQuiz(game)
            .then(result => {
                //TODO: handle error in starting game
            })
        
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