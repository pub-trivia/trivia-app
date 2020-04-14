var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");


module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        questionId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING,
            values: ["easy", "medium", "hard"]
        },
        userId: {
            type: DataTypes.INTEGER,
            required: true
        },
        needsModeration: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        questionType: {
            type: DataTypes.STRING,
            values: ["mc", "tf"]
        },
        answer1: {
            type: DataTypes.STRING
        },
        answer2: {
            type: DataTypes.STRING
        },
        answer3: {
            type: DataTypes.STRING
        },
        answer4: {
            type: DataTypes.STRING
        },
        correctIndex: {
            type: DataTypes.INTEGER,
            validate: {}
        },
        correctCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        incorrectCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    Question.associate = (models) => {
        // Question.belongsToMany(models.Quiz, {
        //     through: 'quizQuestionsAssoc',
        //     as: 'quizzes',
        //     foreignKey: 'quizId'
        // });
        Question.belongsTo(models.User, {
            onDelete: "SET NULL",
            foreignKey: 'userId'
        });

    }
    return Question;
};

