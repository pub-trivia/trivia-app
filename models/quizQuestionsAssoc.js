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
        order: {
            type: DataTypes.INTEGER
        }
    },
        { freezeTableName: true });

    QuizQuestionsAssoc.associate = function (models) {
        QuizQuestionsAssoc.hasMany(models.Quiz, {
            onDelete: "CASCADE",
            foreignKey: "quizId"
        });
        QuizQuestionsAssoc.belongsTo(models.Question, {
            onDelete: "CASCADE",
            foreignKey: "questionId"
        });

    }
    return QuizQuestionsAssoc;
};

