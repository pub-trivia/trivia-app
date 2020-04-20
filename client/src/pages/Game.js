import React, { useState, useEffect } from 'react';
import { ws } from '../components/socket';

import Timer from '../components/Timer';
import QText from '../components/QText';
import QResponse from '../components/QResponse';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';
import API from '../utils/API';


const Game = () => {
    const [state, dispatch] = useGameContext();

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

    useEffect(() => {
        // mocking questio
        // API.getQuizbyCode(game)
        //     .then((result) => {
        //         console.log("=========getQuizbyCodeResult=======")
        //         console.log(result);
        //     }

        //     )
    }, []);


    return (
        <>
            <Timer game={game}/>
            <QText text={mockQuestion.question} />
            <QResponse q="1" responses={[mockQuestion.answer1,
                mockQuestion.answer2,
                mockQuestion.answer3,
                mockQuestion.answer4]} correct={mockQuestion.correctIndex}/>
            <Scoreboard />
        </>
    )
}

export default Game;