module.exports = function (sequelize, DataTypes) {
    var QuizScore = sequelize.define("QuizScore", {
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER
        },
        questionId: {
            type: DataTypes.INTEGER
        },
        displayName: {
            type: DataTypes.STRING,
            required: true
        },
        avatar: {
            type: DataTypes.INTEGER
        },
        avatarColor: {
            type: DataTypes.STRING
        },
        correct: {
            type: DataTypes.BOOLEAN,
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