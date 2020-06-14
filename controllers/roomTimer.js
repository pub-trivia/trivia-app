const { updateScoreboard, getQuestion } = require('./gameController');

const roomTimer = async (game, io) => {
    let totalTime = 16000;
    let timerValue = 15;

    await getQuestion(game, callback => {
        io.to(game).emit('showQuestion', { newquestion: callback });
    })

    let timer = setInterval(() => {
        timerValue --;
        io.to(game).emit('updateTimer', { text: timerValue})
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        updateScoreboard(game, callback => {
            io.to(game).emit('showAnswers', { scores: callback.scores });
            pauseTimer(game, callback.resp, io);  
        });
        
    }, totalTime)
}

const pauseTimer = (game, progress, io) => {
    let totalTime = 3000;
    
    setTimeout(() => {
        if(progress === "inprogress"){
            roomTimer(game, io);
        } else {
            io.to(game).emit('endGame');
            return;
        }   
    }, totalTime)
}

module.exports = { roomTimer };

