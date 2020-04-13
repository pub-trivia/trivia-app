module.exports = function (sequelize, DataTypes) {
    var Quiz = sequelize.define("Quiz", {
        QuizId: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
        questionCount: {
            type: DataTypes.INTEGER
        },
        quizCode: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            freezeTableName: true,
            tableName: 'quizzes'
        });

    Quiz.associate = function (models) {
        // Quiz.belongsToMany(models.Question, {
        //     through: 'quizQuestionsAssoc',
        //     as: 'questions',
        //     foreignKey: 'questionId',
        //     otherKey: 'quizId',
        //     allowNull: true,
        //     defaultValue: null,
        //     onDelete: "set null"
        // });
        Quiz.hasMany(models.QuizScore, {
            onDelete: "CASCADE",
            foreignKey: 'quizId'
        });
        Quiz.belongsTo(models.User, {
            foreignKey: 'userId'
        });

    }
    return Quiz;
};