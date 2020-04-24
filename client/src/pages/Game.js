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
        getQuestion();
    }, []);

    //this use effect is listening for events coming from the server
    useEffect(() => {
         //when someone responds, change their state on the dashboard
         ws.on('respData', ({game, users}) => {
            console.log("==================resp data received==========")
            console.log(users);
            setScoreboard(users);
        })

        //time to show the correct response
        ws.on('showAnswers', ({ text }) => {
            console.log("=========Show answers reached!==============")
            setScoring(true);
            API.getScores(game)
                .then(result => {
                    console.log("======scores returned======")
                    console.log(result.data);
                    setScoreboard(result.data);
                    API.completeQuestion(game)
                        .then(res => {
                             //and emit the scoringcomplete event
                            console.log("===API.completeQuestion response===")
                            console.log(res)
                            if(res === "gameover"){
                                history.push("/results")
                            }
                            ws.emit('scoringComplete', { game }, () => {});
                        })
                })
        })

        ws.on('nextQuestion', ({ game }) => {
            console.log("=========next question reached========")
            getQuestion();
        })
    }, []);
    
    const getQuestion = () => {
        setScoring(false);
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
         if(event.target.id == ques.correctIndex){
             correct = true;
         } else {
             correct = false;
         }
        const q = ques.questionId;
         ws.emit('response', { game, name, q, correct }, (users) => {
            setScoreboard(users);
        });
         API.saveResponse(game, name, icon, color, correct)
            .then(result => {
                console.log("======saveResponse returns======")
                console.log(result);
                 
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
                                            ${selected == {index} ? 'active' : null} 
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