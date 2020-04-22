import React, { useState, useEffect } from 'react';
import { ws } from '../components/socket';

import Timer from '../components/Timer';
import QText from '../components/QText';
import Button from '../components/Button';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';
import API from '../utils/API';


const Game = () => {
    const [state, dispatch] = useGameContext();
    const [selected, setSelected] = useState('');
    const [responded, setScoreboard] = useState('');

    const { game, name, icon, color, users } = state;
    const mockQuestion = {
        questionId: 1,
        question: "Which of the following is correct?",
        category: "History",
        difficulty: "easy",
        userId: 1,
        needsModeration: false,
        questionType: "mc",
        answer1: "Not this one",
        answer2: "Not this one",
        answer3: "This one!",
        answer4: "Not this one",
        correctIndex: 2,
        correctCount: 100,
        incorrectCount: 20
    }

    //TODO: check to make sure this works with tf question types
    const responses = [mockQuestion.answer1, 
                        mockQuestion.answer2, 
                        mockQuestion.answer3,
                        mockQuestion.answer4
                    ]

    useEffect(() => {
        ws.on('respData', ({game, users}) => {
            console.log("==================resp data received==========")
            console.log(users);
            setScoreboard(users);
        })
    }, []);

    const handleResponse = event => {
        let resp;
         setSelected(event.target.id);
         console.log("triggering socket for response");
         if(event.target.id == mockQuestion.correctIndex){
             resp = "correct";
         } else {
             resp = "incorrect";
         }
         const q = mockQuestion.questionId;
         ws.emit('response', { game, name, q, resp }, (users) => {
             //TODO: Use this to update who has responded and who has not
             console.log("=================emit response result===========");
             console.log(users);
             setScoreboard(users);
         });
    }

    return (
        <>
            <Timer game={game}/>
            <QText text={mockQuestion.question} />
            {responses.map((resp, index) => {
                return (
                    <Button 
                        className={selected == {index} ? "gamebutton active" : "gamebutton"} 
                        text={resp} 
                        handleClick={(event) => handleResponse(event)}
                        id={index}
                        key={index}
                    />  
                    )
                })
            }
            <Scoreboard users={responded ? responded : null}/>
        </>
    )
}

export default Game;