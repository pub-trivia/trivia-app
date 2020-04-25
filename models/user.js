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
        icon: {
            type: DataTypes.STRING,
            required: true
        },
        color: {
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
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Question, {
            foreignKey: 'userId',
            onDelete: "SET NULL"
        });
        // User.hasMany(models.Quiz, {
        //     foreignKey: 'userId',
        //     onDelete: "SET NULL"
        // });
    }
    return User;
};
