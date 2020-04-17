DROP DATABASE IF EXISTS pubtrivia;
CREATE DATABASE pubtrivia;
USE pubtrivia;

CREATE TABLE users
(
  userId INTEGER AUTO_INCREMENT PRIMARY KEY,
    displayName VARCHAR(20),
    email VARCHAR(45) NULL,
    password VARCHAR(16) NULL,
    icon VARCHAR(20),
    color VARCHAR(12), 
    gamesPlayed INTEGER DEFAULT 0,
    gamesWon INTEGER DEFAULT 0, 
    isBlocked BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  INSERT INTO users
    ( displayName, email, password, icon, color, createdAt, updatedAt)
  VALUES
    ('External', '', '', '', '', NOW(), NOW()),
    ('Susan', 'susan@test.com', 'susanpw', "Tim", '#9665D8', NOW(), NOW()),
    ('Cat', 'cat@test.com', 'catkrspw', "Carl" , '#04D5FB', NOW(), NOW()),
    ('Mandy', 'mandy@test.com', 'mandytpw', "Zach", '#9FA1A0', NOW(), NOW()),
    ('Cynthia', 'cynthia@test.com', 'cynthiapw', "Carl", '#4481D8', NOW(), NOW());
    
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
        ( quizId, userId, category, difficulty, questionCount, quizCode, createdAt, updatedAt)
      VALUES
        (1, 1, "History", "Medium", 5, "R2D2"),
        (2, 2, "Music", "Medium", 5, "C3PO");


      CREATE TABLE quizScores
      (
        id INTEGER AUTO_INCREMENT PRIMARY KEY, 
        quizId INTEGER, 
        userId INTEGER DEFAULT NULL,
        questionId INTEGER, 
        displayName VARCHAR(20), 
        icon VARCHAR(20),
        color VARCHAR(12), 
        correct BOOLEAN,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_quizAssoc FOREIGN KEY(quizId) 
          REFERENCES quizzes(quizId) ON DELETE SET NULL 
        -- CONSTRAINT fk_questionAssoc FOREIGN KEY(questionId) 
        --   REFERENCES question(questionId) ON DELETE SET NULL
        );

        INSERT INTO quizScores
           ( quizId, userId, questionId, displayName, icon, color, correct, createdAt, updatedAt)
        VALUES
          ( 1, 1, 10, "Susan", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 1, 1, 11, "Susan", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 1, 1, 12, "Susan", "Tim", '#9665D8', 0, NOW(), NOW()),
          ( 1, 1, 13, "Susan", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 1, 1, 14, "Susan", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 1, 2, 10, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
          ( 1, 2, 11, "Badger", "Carl", '#9665D8', 0, NOW(), NOW()),
          ( 1, 2, 12, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
          ( 1, 2, 13, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
          ( 1, 2, 14, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
          ( 1, 3, 10, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
          ( 1, 3, 11, "Mandy", "Zack", '#9665D8', 0, NOW(), NOW()),
          ( 1, 3, 12, "Mandy", "Zack", '#9665D8', 0, NOW(), NOW()),
          ( 1, 3, 13, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
          ( 1, 3, 14, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
          ( 1, 4, 10, "Cynthia", "Jon", '#9665D8', 1, NOW(), NOW()),
          ( 1, 4, 11, "Cynthia", "Jon", '#9665D8', 1, NOW(), NOW()),
          ( 1, 4, 12, "Cynthia", "Jon", '#9665D8', 0, NOW(), NOW()),
          ( 1, 4, 13, "Cynthia", "Jon", '#9665D8', 1, NOW(), NOW()),
          ( 1, 4, 14, "Cynthia", "Jon", '#9665D8', 1, NOW(), NOW()),
          ( 2, 3, 20, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 2, 3, 21, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 2, 3, 22, "Mandy", "Tim", '#9665D8', 0, NOW(), NOW()),
          ( 2, 3, 23, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 2, 3, 14, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
          ( 2, 4, 20, "CRich", "Zack", '#9665D8', 1, NOW(), NOW()),
          ( 2, 4, 21, "CRich", "Zack", '#9665D8', 0, NOW(), NOW()),
          ( 2, 4, 22, "CRich", "Zack", '#9665D8', 0, NOW(), NOW()),
          ( 2, 4, 23, "CRich", "Zack", '#9665D8', 1, NOW(), NOW()),
          ( 2, 4, 14, "CRich", "Zack", '#9665D8', 1, NOW(), NOW()); 






