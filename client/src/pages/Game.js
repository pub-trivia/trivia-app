import React, { useState, useEffect } from 'react';
import { ws } from '../components/socket';

import Timer from '../components/Timer';
import QText from '../components/QText';
import Button from '../components/Button';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';
import API from '../utils/API';


const Game = () => {
    let pause;
    const [state, dispatch] = useGameContext();
    const [selected, setSelected] = useState('');
    const [responded, setScoreboard] = useState('');
    const [ques, setQuestion] = useState();
    const [scoring, setScoring] = useState(false);
    // const ques = {
    //     questionId: 1,
    //     question: "Which of the following is correct?",
    //     questionType: "mc",
    //     responses: ["Not this one", 
    //         "Not this one", 
    //         "This one!",
    //         "Not this one"],
    //     correctIndex: 2,
    //     correctCount: 100,
    //     incorrectCount: 20
    // }

    const { game, name, icon, color, users } = state;

    //this use effect should only run the first time
    useEffect(() => {
        console.log("============use effect reached, getting question=========");
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
            API.saveScores(responded)
                .then(result => {
                    //after saving the scores, clear the responded state
                    setScoreboard('')
                    //and emit the scoringcomplete event
                    ws.emit('scoringComplete', { game }, () => {});
                })
        })

        ws.on('nextQuestion', ({ game }) => {
            console.log("================next question reached==============")
            getQuestion(game);
        })
    }, []);
    
    const getQuestion = (game) => {
        console.log("==============getNextQuestion================");
        setScoring(false);
        API.getQuestion(game)
            .then(result => {
                console.log(result.data[0]);
                const { questionId, question, correctIndex, answer1, answer2, answer3, answer4 } = result.data[0]
                setQuestion({
                    questionId,
                    question,
                    correctIndex,
                    responses: [answer1, answer2, answer3, answer4]
                });
            })
    }

    const handleResponse = event => {
        let resp;
         setSelected(event.target.id);
         if(event.target.id == ques.correctIndex){
             resp = "correct";
         } else {
             resp = "incorrect";
         }
         const q = ques.questionId;
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
            {/* Pass an array of user objects showing everyone in the game: name, icon, color, responded (T/F), numCorrect */}
            <Scoreboard users={responded ? responded : null} questions="5"/>
        </>
    )
}

export default Game;