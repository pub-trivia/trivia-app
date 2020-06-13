import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ws } from '../components/socket';

import Timer from '../components/Timer';
import QText from '../components/QText';
import Button from '../components/Button';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';
import API from '../utils/API';


const Game = () => {
    const [state, dispatch] = useGameContext();
    const [sel, setSelected] = useState();
    const [responded, setScoreboard] = useState([]);
    const [ques, setQuestion] = useState();
    const [scoring, setScoring] = useState(false);
    let history = useHistory();

    const { game, id, name, icon, color } = state;

    //this use effect should only run the first time
    useEffect(() => {
        if(localStorage.currentGame !== game){
            history.push('/');
        } 
    }, []);

    //this use effect is listening for events coming from the server
    useEffect(() => {
        ws.on('showQuestion', ({ newquestion }) => {
            console.log("useEffect showQuestion received");
            console.log(newquestion);
            const { questionId, question, questionType, correctIndex, answer1, answer2, answer3, answer4 } = newquestion;
                let responses = [];
                if(questionType === "tf"){
                    responses = [answer1, answer2]
                } else {
                    responses = [answer1, answer2, answer3, answer4]
                }
                //just in case socket is received more than once
                //only update state if it is a new question
                if(!ques || ques.questionId !== questionId){
                    setScoring(false);
                    setSelected({
                        questionId,
                        response: ''
                    });
                    setQuestion({
                        questionId,
                        question,
                        correctIndex,
                        responses 
                    });
                };
        }); 

        //when someone responds, change the state of the scoreboard
        //and pass array of responses
         ws.on('respData', ({ callback }) => {
           console.log("==> respData received")
           console.log(callback);
           setScoreboard(callback);
        })

        //show the correct response
        ws.on('showAnswers', ({ text }) => {
            setScoring(true);
            API.getScores(game)
                .then(result => {
                    setScoreboard(result.data);
                    API.completeQuestion(game)
                        .then(res => {
                             //and emit the scoringcomplete event
                            if(res.data.gameStatus === "gameover"){
                                history.push("/results")
                            } else {
                                ws.emit('scoringComplete', { game }, () => {});
                            }
                            
                        })
                })
        })
    }, []);

    const handleResponse = event => {
        let correct; 
        console.log("==> game.js handle response")
        console.log(event.target.id);
        if(parseInt(event.target.id) === parseInt(ques.correctIndex)){
            correct = true;
        } else {
            correct = false;
        }
        setSelected({
            response: event.target.id,
            ...state
        });
        API.saveResponse(game, id, name, icon, color, ques.questionId, correct);
          
    }

    return (
        <>
            <Timer />
            <QText text={ques ? ques.question : null} />
            {ques ? 
                ques.responses.map((resp, index) => {
                    return (
                        <Button 
                            className={`gamebutton ${parseInt(sel.response) === parseInt(index) ? 'response' : ''} ${scoring ? `disabled ${index == ques.correctIndex ? 'correct' : ''}` : ''}`}
                            text={resp} 
                            handleClick={!scoring ? (event) => handleResponse(event) : null }
                            id={index}
                            key={index}
                        />  
                        )
                    })
                : null
                }
            {/* Pass an array of user objects showing everyone in the game: name, icon, color, responded (T/F), %Correct */}
            <Scoreboard users={responded ? responded : null}/>
        </>
    )
}

export default Game;