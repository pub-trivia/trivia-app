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
    const [selected, setSelected] = useState('');
    const [responded, setScoreboard] = useState('');
    const [ques, setQuestion] = useState();
    const [scoring, setScoring] = useState(false);
    let history = useHistory();

    const { game, name, icon, color } = state;

    //this use effect should only run the first time
    useEffect(() => {
        if(localStorage.currentGame === game){
            getQuestion();
        } else {
            history.push('/');
        }
    }, []);

    //this use effect is listening for events coming from the server
    useEffect(() => {
         //when someone responds, change their state on the dashboard
         ws.on('respData', ({game}) => {
            API.getResponses(game)
                .then(result => {
                    setScoreboard(result.data);
                })
            
        })

        //time to show the correct response
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

        ws.on('nextQuestion', ({ game }) => {
            getQuestion();
        })
    }, []);
    
    const getQuestion = () => {
        setScoring(false);
        setSelected('');
        API.getQuestion(game)
            .then(result => {
                const { questionId, question, questionType, correctIndex, answer1, answer2, answer3, answer4 } = result.data;
                let responses = [];
                if(questionType === "tf"){
                    responses = [answer1, answer2]
                } else {
                    responses = [answer1, answer2, answer3, answer4]
                }
                setQuestion({
                    questionId,
                    question,
                    correctIndex,
                    responses 
                });
                ws.emit('startquestion', { game }, () => {});
            })
    }

    const handleResponse = event => {
        let correct;
         setSelected(event.target.id);
         if(parseInt(event.target.id) === parseInt(ques.correctIndex)){
             correct = true;
         } else {
             correct = false;
         }
         
         API.saveResponse(game, name, icon, color, correct)
            .then(result => {
                ws.emit('response', { game }, () => {});
            })  
    }

    return (
        <>
            <Timer />
            <QText text={ques ? ques.question : null} />
            {ques ? 
                ques.responses.map((resp, index) => {
                    return (
                        <Button 
                            className={`gamebutton 
                                            ${parseInt(selected) === parseInt(index) ? 'focus' : null} 
                                            ${scoring ? `disabled ${index == ques.correctIndex ? 'correct' : null}` : null}`}
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