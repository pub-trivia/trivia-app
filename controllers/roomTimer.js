const timers = [];

const roomTimer = (game, type, io) => {
    //check to see if there is already an active timer
    //for this game, if not, start one
    let timerValue;

    if(!getTimer(game)){
        
        if(type === "question") {
            timerValue = 16;
        } else {
            timerValue = 4;
        }

        const timer = setInterval(() => {
            if (timerValue >= 0){
                handleDecrease();
            } else {
                clearInterval(timer);
                //then time runs out, remove the timer 
                //it will be re-added on the next request
                removeTimer(game);
            }}, 1000);
        }
    
    
    const handleDecrease = () => {
        timerValue --;
        console.log(`${type} timer: ${timerValue}`)
        if(timerValue >= 0){
            io.to(game).emit('updateTimer', { text: timerValue})
          }
          else {
            if(type === "question"){
                io.to(game).emit('showAnswers', { text: "Time's up!"})
            } else {
                io.to(game).emit('nextQuestion', { game });
            }
            
          }
    }
}

//if I get here, it's because I emitted an event that
//needs a timer
const getTimer = (game) => {
    game = game.trim().toLowerCase();
    //check to see if there is already a timer running
    const existingTimer = timers.find((timer) => timer.game === game);
    //if so, return true which will be ignored in roomTimer
    if(existingTimer){
        console.log(`There is already a timer running for ${game}`);
        return true;
    } 
    //otherwise, push the game to the array
    timers.push(game);
    //and return false to create a new roomTimer
    return false;
}

const removeTimer = (game) => {
    game = game.trim().toLowerCase();

    const existingTimer = timers.find((timer) => timer.game === game);

    if(existingTimer){
        timers.splice(timers.indexOf(game), 1)
    }
}

module.exports = { roomTimer };

