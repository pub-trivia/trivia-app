module.exports = function (sequelize, DataTypes) {
    var QuizScore = sequelize.define("QuizScore", {
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        icon: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        correct: {
            type: DataTypes.BOOLEAN,
            required: true
        }
    },
        {
            freezeTableName: true,
            tableName: 'quizscores'
        });

    QuizScore.associate = function (models) {
        QuizScore.belongsTo(models.Quiz, {
            onDelete: 'CASCADE',
            foreignKey: 'quizId'
        });
    }
    return QuizScore;
};