module.exports = function (sequelize, DataTypes) {
    var Quiz = sequelize.define("Quiz", {
        QuizId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING,
            values: ["easy", "medium", "hard"]
        },
        authorId: {
            type: DataTypes.INTEGER,
            required: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        questionCount: {
            type: DataTypes.INTEGER
        }
    },
        {
            freezeTableName: true,
            tableName: 'quizzes'
        });

    Quiz.associate = function (models) {
        Quiz.belongsToMany(models.Question, {
            through: 'quizQuestionsAssoc',
            as: 'questions',
            foreignKey: 'questionId',
            otherKey: 'quizId',
            allowNull: true,
            defaultValue: null,
            onDelete: "set null"
        });
        // Quiz.hasMany(models.QuizScore, {
        //     onDelete: "CASCADE"
        // });

    }
    return Quiz;
};