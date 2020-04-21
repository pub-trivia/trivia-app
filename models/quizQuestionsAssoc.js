module.exports = function (sequelize, DataTypes) {
    var QuizQuestionsAssoc = sequelize.define("QuizQuestionsAssoc", {
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            required: true
        },
        questionOrder: {
            type: DataTypes.INTEGER
        }
    },
        { freezeTableName: true });

    return QuizQuestionsAssoc;
};

