const db = require('../models');

const getQuestion = async (game, callback) => {
    let quizId;
    
    await getQuizId(game, res => {
        quizId = res.quizId
    });
    
    let queryString =  `SELECT * 
                          FROM Questions q
                          INNER JOIN QuizQuestionsAssoc a ON q.questionId = a.questionId
                          WHERE a.quizId=${quizId} AND a.progress="started";`
    const [results, metadata] = await db.sequelize.query(queryString)
    return callback(results[results.length - 1]);
}

const getQuizId = async (game, callback) => {
    await db.Quiz.findOne({
        attributes: ['quizId', 'questionCount'],
        where: {
            quizCode: game,
            isActive: 1  
        }
    }).then(result => {
        if(result){
            return callback(result.dataValues);
        } 
    }).catch(err => {
        console.log(err)
    })
}

const getQuestionId = async (quizId, qNum, callback) => {
    await db.QuizQuestionsAssoc.findOne({
        attributes: ['questionId'],
        where: {
            quizId,
            questionOrder: qNum
        }
    }).then(result => {
        return callback(result.dataValues);
    }).catch(err => {
        console.log(err)
    })
}

const startQuiz = async (quizCode, resp) => {
    let quizId;
    
    await getQuizId(quizCode, res => {
        quizId = res.quizId
    });

    await db.QuizQuestionsAssoc.update(
        {progress: "started"},
        {where: {
            quizId,
            questionOrder: 1
        }}
    ).then(result => {
        return resp(result);
    }).catch(err => {
        console.log(err);
    })
}

const getResponses = async (quizId, questionId, callback) =>{
    await db.QuizScore.findAll({
        where: {
            quizId,
            questionId
        },
        order: [['updatedAt', 'DESC']]
    }).then(result => {
        // TODO: Check if everyone has answered
        return callback(result);
    }).catch(err => {
        console.log(err);
    })
}

const recordResponse = async (quizCode, userId, displayName, icon, color, questionId, correct, callback) => {
    let quizId;
    let name = displayName.toUpperCase();
    if (!userId) {
        userId = 999999999;
    }
    
    await getQuizId(quizCode, res => {
        quizId = res.quizId
    });
    //look for a response from this user
    await db.QuizScore.findOne({
        where: {
            quizId, 
            userId,
            questionId,
            displayName: name,
            icon,
            color
        }
    }).then(result => {
        if (!result) {
            //if no record exists, create one
            db.QuizScore.create({
                quizId,
                userId,
                questionId,
                displayName: name,
                icon,
                color,
                correct
            }).then(result => {
                getResponses(quizId, questionId, res => {
                    return callback(res)
                });
            }).catch(err => {
                console.log(err);
            })
        } else {
            //if a record already exists, update it
            db.QuizScore.update(
                {correct: correct},
                {where: {
                    quizId,
                    userId,
                    questionId,
                    displayName: name
                }
            }).then(result => {
                getResponses(quizId, questionId, res => {
                    return callback(res)
                });
            }).catch(err => {
                console.log(err);
            })
        }
        
    }).catch(err => {
        console.log(err);
    })
}

const updateScoreboard = async (game, callback) => {
    let quizId;
    let questionCount;

    await getQuizId(game, res => {
        quizId = res.quizId;
        questionCount = res.questionCount
    });

    await closeQuestion(quizId, questionCount, resp => {
        calcScores(game, scores => {
            if(resp !== "inprogress"){
                finishQuiz(quizId, scores);
            }
            return callback({resp, scores});
        })    
    })
}

const calcScores = async (game, scores) => {
    let quizId;
    let questionCount;

    await getQuizId(game, res => {
        quizId = res.quizId;
        questionCount = res.questionCount
    });

    let queryString = `SELECT u.displayName, u.userId, u.icon, u.color, (100 * SUM(u.correct) / ${questionCount}) AS score
                            FROM quizzes q
                            INNER JOIN QuizScores u ON q.quizId = u.quizId
                            WHERE q.quizId=${quizId}
                            GROUP BY u.displayName, u.userId, u.icon, u.color
                            ORDER BY score DESC;`
    const [results, metadata] = await db.sequelize.query(queryString);
    return scores(results);
}

//mark current question as completed 
//mark next question as started
//if no next question, complete quiz
const closeQuestion = async (quizId, questionCount, resp) => {
    //find the order of the question being closed
    let lastQ;
    let nextQ;
    await db.QuizQuestionsAssoc.findOne(
        {where: {
            quizId,
            progress: "started"
        }}
    ).then(result => {
        //make sure users have responded to it
        db.QuizScore.findOne(
            {where: {
                quizId,
                questionId: result.dataValues.questionId
            }}
        ).then(aok => {
            if(aok){
                lastQ = result.dataValues.questionOrder;
                nextQ = lastQ + 1;
                db.QuizQuestionsAssoc.update(
                    {progress: "completed"},
                    {where: {
                        quizId,
                        questionOrder: lastQ
                        }
                    }).then(result => {
                    }).catch(err => 
                        console.log(err)
                    )
                if(lastQ === questionCount){
                    return resp("finished");
                } else {
                    db.QuizQuestionsAssoc.update(
                        {progress: "started"},
                        {where: {
                            quizId,
                            questionOrder: nextQ
                        }}
                    ).then(result => {
                        return resp("inprogress");
                    }).catch(err => {
                        console.log(err);
                    })
                }        
            } else {
                return resp("inprogress");
            }
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

const finishQuiz = (quizId, scores) => {
    db.Quiz.update(
        {isActive: false},
        {where: {
            quizId
        }}
    ).then(done => {
    }).catch(err => {
        console.log(err)
    })
    if (scores[0].userId !== 999999999){
        db.User.increment(
            {gamesWon: 1},
            { where: {
                userId: scores[0].userId
            }}
        ).then(winner => {   
        }).catch(err => {
            console.log(err)
        })
    }
    scores.map(user => {
        if(user.userId !== 999999999){
            db.User.increment(
                {gamesPlayed: 1},
                { where: {
                    userId: user.userId
                }}
            ).then(player => {
            }).catch(err => {
                console.log(err);
            })
        }
    })
        
}

module.exports = { getQuizId, getQuestionId, getQuestion, recordResponse, updateScoreboard, startQuiz, calcScores }