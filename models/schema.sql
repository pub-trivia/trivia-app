DROP DATABASE IF EXISTS pubtrivia;
CREATE DATABASE pubtrivia;
USE pubtrivia;

CREATE TABLE users
(
  userId INTEGER AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(20),
    email VARCHAR(45) NULL,
    password VARCHAR(16) NULL,
    avatar INTEGER,
    avatarColor VARCHAR(12), 
    gamesPlayed INTEGER DEFAULT 0,
    gamesWon INTEGER DEFAULT 0, 
    questionsAnswered INTEGER DEFAULT 0,
    correctAnswers INTEGER DEFAULT 0,
    isBlocked BOOLEAN DEFAULT FALSE
);

  INSERT INTO users
    ( userName, email, password, avatar)
  VALUES
    ('External', '', '', NULL),
    ('Susan', 'susan@test.com', 'susanpw', 1),
    ('Cat', 'cat@test.com', 'catkrspw', 2),
    ('Mandy', 'mandy@test.com', 'mandytpw', 3),
    ('Cynthia', 'cynthia@test.com', 'cynthiapw', 4);


  CREATE TABLE questions
  (
    questionId INTEGER AUTO_INCREMENT PRIMARY KEY, 
     question VARCHAR(256) NOT NULL,
     category VARCHAR(45) NULL,
     difficulty VARCHAR(10) NULL,
     authorId INTEGER,
     votesAgainst INT DEFAULT 0,
     needsModeration BOOLEAN DEFAULT FALSE ,
     questionType VARCHAR(2) NULL,
     answer1 VARCHAR(120) NULL,
     answer2 VARCHAR(120) NULL,
     answer3 VARCHAR(120) NULL,
     answer4 VARCHAR(120) NULL,
     correctIndex INTEGER NOT NULL,
     correctCount INTEGER  DEFAULT 0,
     incorrectCount INTEGER  DEFAULT 0, 
     CONSTRAINT fk_author FOREIGN KEY (authorId) 
        REFERENCES users(userId) ON DELETE SET NULL
    );



    CREATE TABLE quizzes
    (
      quizId INTEGER AUTO_INCREMENT PRIMARY KEY, 
      creatorId INTEGER, 
      category VARCHAR(45),  
      difficulty VARCHAR(10),
      code VARCHAR(4),
      isActive BOOLEAN DEFAULT FALSE,
      CONSTRAINT fk_creator FOREIGN KEY (creatorId) 
        REFERENCES users(userId) ON DELETE SET NULL
      );

      INSERT INTO quizzes
        ( quizId, creatorId, category, difficulty)
      VALUES
        (1, 1, "History", "Medium"),
        (2, 2, "Music", "Medium");


      CREATE TABLE quizQuestionsAssoc
      (
        quizId INTEGER,
        questionId INTEGER,
        CONSTRAINT fk_quizid FOREIGN KEY (quizId) 
          REFERENCES quizzes(quizId) ON DELETE CASCADE,
        CONSTRAINT fk_question FOREIGN KEY (questionId) 
          REFERENCES questions(questionId) ON DELETE CASCADE
      );

      -- INSERT INTO quizQuestionsAssoc ( quizId, questionId ) 
      --   VALUES ( 1, 10), (1, 11), (1, 12), (1,13), (1,14), 
      --          (2, 20), (2, 21), (2, 22), (2, 23), (2, 14);  

      CREATE TABLE quizScoresAssoc
      (
        id INTEGER AUTO_INCREMENT PRIMARY KEY, 
        quizId INTEGER, 
        userId INTEGER,
        userName VARCHAR(20), 
        score INTEGER,
        CONSTRAINT fk_quizAssoc FOREIGN KEY(quizId) 
          REFERENCES quizzes(quizId) ON DELETE CASCADE, 
        CONSTRAINT fk_userAssoc FOREIGN KEY(userId) 
	        REFERENCES users(userId) ON DELETE SET NULL
        );

        INSERT INTO quizScoresAssoc
          ( quizId, userId, userName, score)
        VALUES
          ( 1, 1, "Susan", 4),
          ( 1, 2, "Badger", 5),
          ( 1, 3, "Mandy", 4),
          ( 1, 4, "Cynthia", 5),
          ( 2, 3, "Mandy", 5),
          ( 2, 4, "CRich", 5);  





