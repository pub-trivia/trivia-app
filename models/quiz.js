module.exports = function (sequelize, DataTypes) {
    var Quiz = sequelize.define("Quiz", {
        quizId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        currentQuestion: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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
        Quiz.hasMany(models.QuizScore, {
            onDelete: "set null",
            foreignKey: 'quizId'
        });
        Quiz.belongsTo(models.User, {
            foreignKey: 'userId'
        });

    }
    return Quiz;
};