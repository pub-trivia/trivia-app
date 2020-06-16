const db = require('../models');

const getModQuestions = async (callback) => {
    db.Questions.findAll({
        where: {
            needsModeration: true
        }
    }).then(result => {
        return callback(result.dataValues);
    })
}

module.exports = { getModQuestions }