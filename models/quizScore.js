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
        avatar: {
            type: DataTypes.INTEGER
        },
        avatarColor: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER,
            required: true
        }
    });

    QuizScore.associate = function (models) {
        QuizScore.belongsTo(models.Quiz, {
            onDelete: 'CASCADE',
            foreignKey: 'quizId'
        });
    }
    return QuizScore;
};