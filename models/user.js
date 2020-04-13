var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {}
        },
        avatar: {
            type: DataTypes.INTEGER,
            required: true
        },
        avatarColor: {
            type: DataTypes.STRING,
            required: true
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        gamesWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        questionsAnswered: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        correctAnswers: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Question, {
            foreignKey: 'userId'
        });
        // User.hasMany(models.Quiz, {
        //     onDelete: "SET NULL"
        // });
        // User.hasMany(models.QuizScore, {
        //     onDelete: "CASCADE"
        // });

    }
    return User;
};
