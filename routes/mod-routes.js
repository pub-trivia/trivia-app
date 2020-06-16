const { getModQuestions } = require("../controllers/questionController");

module.exports = (app) => {

    // marks the first question in the quiz as started
    app.get("/api/moderate", async (req, res) => {
        await getModQuestions(resp => {
            return res.json(resp);
        }) 
    }) 
}