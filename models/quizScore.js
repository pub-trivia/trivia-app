module.exports = function (sequelize, DataTypes) {
    var QuizScore = sequelize.define("QuizScore", {
        userId: {
            type: DataTypes.INTEGER
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER,
            required: true
        }
    });

    // QuizScore.associate = function (models) {
    //     QuizScore.hasMany(models.Quiz, {
    //         onDelete: "set null"
    //     });

    // } 
    return QuizScore;
};