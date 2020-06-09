const roomTimer = (game, type, io) => {
    let totalTime;
    let timerValue;
        
    if(type === "question") {
        totalTime = 16000;
        timerValue = 15;
    } else {
        totalTime = 4000;
        timerValue = 3;
    }

    let timer = setInterval(() => {
        timerValue --;
        io.to(game).emit('updateTimer', { text: timerValue})
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        if(type === "question"){
            io.to(game).emit('showAnswers', { text: "Time's up!"})
        } else {
            io.to(game).emit('nextQuestion', { game });
        }
    }, totalTime)
}

module.exports = { roomTimer };

