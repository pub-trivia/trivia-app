## API route documentation:  ones with *'s are working 

*  *GET /api/login/ - send email and password in body, returns the userid 

* *GET /api/finduser/:email - send the email and it returns the userid - not sure if we want to use this as it does not validate the password

* *GET /api/getuser/:userid - gets data for that user (do we want to include the question counts, currently a separate query below?) 

* *GET /api/questioncounts/:userid - get total questions answered and correct answers by userid 

* *GET /api/getscores/:quizid - returns all the scores for that quiz

* *GET /api/categories/  - returns all question categories, to be used in dropdown where user selects category when creating a quiz 

* *GET /api/user/questions/:userid - returns that user's questions, useful for dashboard 

* *GET /api/getquestions - send category, number of returns the number of questions specified that match the criteria in the form (actually returns extras in case some are marked invalid or inappropriate).  Should be called to start a quiz - questions used will be accessible later by pulling distinct values from quizScores 

* *GET /api/quizbycode/:code - get quiz information by the code 
* *GET /api/quizbyid/:quizid - get quiz information by the id - not sure if we need this 

* *GET /api/quiz/questions/:quizid, not sure if we need this, but it generates an array of questionIds from the quizScores table  
 
* *POST /api/createuser - create a new user, returns newUserObject, error if email address is already registered 

* *GET /api/getcode - returns a new unique 4 character code 

* *POST /api/createquiz - create a new quiz, pass in category, difficulty, questionCount, quizCode, userId (will return questions that were NOT created by that user), returns newQuizObject
Note:  Call /api/getcode first to get the unique code 

* *POST /api/createquestion - create a new question, see code for details of what to pass.  questionType is either "mc" or "tf" for multiple choice or true/false.  If true/false then only need to correctIndex, answer1 and answer2 will be set to True and False, respectively 

* *POST /api/addquestionscore/ - for each user and each question, create a quizScore entry 

* *PUT /api/question/moderate/:questionid - mark for moderation
   Note:  You can call this without error but doesn't yet work 

* *PUT /api/gameplayed/:userid/:won  When a game is over, call for each registered user that played, set won to true if they won the game, it updates gamesPlayed, gamesWon for that user 

*  GET /api/question/counts/:questionId -  how many answered
    correctly / incorrectly 
