module.exports = function (sequelize, DataTypes) {
    var QuizQuestionsAssoc = sequelize.define("QuizQuestionsAssoc", {
        QuizId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            required: true
        }
    },
        { freezeTableName: true });

    QuizQuestionsAssoc.associate = function (models) {
        QuizQuestionsAssoc.hasMany(models.Quiz, {
            onDelete: "set null"
        });
        QuizQuestionsAssoc.belongsTo(models.Question, {
            onDelete: "CASCADE"
        });

    }
    return QuizQuestionsAssoc;
};