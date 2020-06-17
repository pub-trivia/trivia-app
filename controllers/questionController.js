const db = require('../models');

const getModQuestions = async (callback) => {
    db.Question.findAll({
        where: {
            needsModeration: true
        }
    }).then(result => {
        return callback(result);
    })
}

module.exports = { getModQuestions }