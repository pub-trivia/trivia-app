
USE pubtrivia;

INSERT INTO quizzes
    ( category, difficulty, questionCount, quizCode, createdAt, updatedAt)
VALUES
    (2, "History", "easy", 5, "R2D2", NOW(), NOW()),
    (2, "Music", "medium", 5, "C3PO", NOW(), NOW());


INSERT INTO quizScores
    ( userId, questionId, displayName, icon, color, correct, createdAt, updatedAt)
VALUES
    ( 1, 2, 10, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
    ( 1, 2, 11, "Badger", "Carl", '#9665D8', 0, NOW(), NOW()),
    ( 1, 2, 12, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
    ( 1, 2, 13, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
    ( 1, 2, 14, "Badger", "Carl", '#9665D8', 1, NOW(), NOW()),
    ( 1, null, 10, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
    ( 1, null, 11, "Mandy", "Zack", '#9665D8', 0, NOW(), NOW()),
    ( 1, null, 12, "Mandy", "Zack", '#9665D8', 0, NOW(), NOW()),
    ( 1, null, 13, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
    ( 1, null, 14, "Mandy", "Zack", '#9665D8', 1, NOW(), NOW()),
    ( 2, 2, 20, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
    ( 2, 2, 21, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
    ( 2, 2, 22, "Mandy", "Tim", '#9665D8', 0, NOW(), NOW()),
    ( 2, 2, 23, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
    ( 2, 2, 14, "Mandy", "Tim", '#9665D8', 1, NOW(), NOW()),
    ( 2, null, 20, "CRich", "Zack", '#9665D8', 1, NOW(), NOW()),
    ( 2, null, 21, "CRich", "Zack", '#9665D8', 0, NOW(), NOW()),
    ( 2, null, 22, "CRich", "Zack", '#9665D8', 0, NOW(), NOW()),
    ( 2, null, 23, "CRich", "Zack", '#9665D8', 1, NOW(), NOW()),
    ( 2, null, 14, "CRich", "Zack", '#9665D8', 1, NOW(), NOW());

INSERT INTO quizQuestionsAssoc
    ( quizId, questionId, questionOrder, progress, createdAt, updatedAt)
VALUES
    (1 , 10, 1, null, NOW(), NOW()),
    (1 , 11, 2, null, NOW(), NOW()),
    (1 , 12, 3, null, NOW(), NOW()),
    (1 , 13, 4, null, NOW(), NOW()),
    (1 , 14, 5, null, NOW(), NOW()),
    (2 , 20, 1, null, NOW(), NOW()),
    (2 , 21, 2, null, NOW(), NOW()),
    (2 , 22, 3, null, NOW(), NOW()),
    (2 , 23, 4, null, NOW(), NOW()),
    (2 , 24, 5, null, NOW(), NOW()); 




