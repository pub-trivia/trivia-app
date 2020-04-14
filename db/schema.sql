DROP DATABASE IF EXISTS pubtrivia;
CREATE DATABASE pubtrivia;
USE pubtrivia;

CREATE TABLE users
(
  userId INTEGER AUTO_INCREMENT PRIMARY KEY,
    displayName VARCHAR(20),
    email VARCHAR(45) NULL,
    password VARCHAR(16) NULL,
    avatar INTEGER,
    avatarColor VARCHAR(12), 
    gamesPlayed INTEGER DEFAULT 0,
    gamesWon INTEGER DEFAULT 0, 
    questionsAnswered INTEGER DEFAULT 0,
    correctAnswers INTEGER DEFAULT 0,
    isBlocked BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  INSERT INTO users
    ( displayName, email, password, avatar, avatarColor)
  VALUES
    ('External', '', '', NULL, ""),
    ('Susan', 'susan@test.com', 'susanpw', 1, '#9665D8'),
    ('Cat', 'cat@test.com', 'catkrspw', 2 , '#04D5FB'),
    ('Mandy', 'mandy@test.com', 'mandytpw', 3, '#9FA1A0'),
    ('Cynthia', 'cynthia@test.com', 'cynthiapw', 4, '#4481D8');


  CREATE TABLE questions
  (
    questionId INTEGER AUTO_INCREMENT PRIMARY KEY, 
     question VARCHAR(256) NOT NULL,
     category VARCHAR(45) NULL,
     difficulty VARCHAR(10) NULL,
     userId INTEGER,
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
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
     CONSTRAINT fk_author FOREIGN KEY (userId) 
        REFERENCES users(userId) ON DELETE SET NULL
    );



    CREATE TABLE quizzes
    (
      quizId INTEGER AUTO_INCREMENT PRIMARY KEY, 
      userId INTEGER, 
      category VARCHAR(45),  
      difficulty VARCHAR(10),
      questionCount INTEGER,
      quizCode VARCHAR(6),
      isActive BOOLEAN DEFAULT FALSE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_creator FOREIGN KEY (userId) 
        REFERENCES users(userId) ON DELETE SET NULL
      );

      INSERT INTO quizzes
        ( quizId, userId, category, difficulty, questionCount, quizCode)
      VALUES
        (1, 1, "History", "Medium", 5, "R2D2"),
        (2, 2, "Music", "Medium", 5, "C3PO");


      CREATE TABLE quizQuestionsAssoc
      (
        quizId INTEGER,
        questionId INTEGER,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_quizid FOREIGN KEY (quizId) 
          REFERENCES quizzes(quizId) ON DELETE CASCADE,
        CONSTRAINT fk_question FOREIGN KEY (questionId) 
          REFERENCES questions(questionId) ON DELETE CASCADE
      );

      -- INSERT INTO quizQuestionsAssoc ( quizId, questionId ) 
      --   VALUES ( 1, 10), (1, 11), (1, 12), (1,13), (1,14), 
      --          (2, 20), (2, 21), (2, 22), (2, 23), (2, 14);  

      CREATE TABLE quizScores
      (
        id INTEGER AUTO_INCREMENT PRIMARY KEY, 
        quizId INTEGER, 
        userId INTEGER,
        displayName VARCHAR(20), 
        avatar INTEGER,
        avatarColor VARCHAR(12), 
        score INTEGER,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_quizAssoc FOREIGN KEY(quizId) 
          REFERENCES quizzes(quizId) ON DELETE CASCADE, 
        CONSTRAINT fk_userAssoc FOREIGN KEY(userId) 
	        REFERENCES users(userId) ON DELETE SET NULL
        );

        INSERT INTO quizScores
          ( quizId, userId, displayName, score, avatar, avatarColor)
        VALUES
          ( 1, 1, "Susan", 4, 1, '#9665D8'),
          ( 1, 2, "Badger", 5, 2, '#9665D8'),
          ( 1, 3, "Mandy", 4, 3, '#9665D8'),
          ( 1, 4, "Cynthia", 5, 4, '#9665D8'),
          ( 2, 3, "Mandy", 5, 5, '#9665D8'),
          ( 2, 4, "CRich", 5, 6, '#9665D8');  





