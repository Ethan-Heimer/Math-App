const model = require("../model/noteDatabase.js");

module.exports = {
    GetAllNotes: (req, res) => {
        model.GetAllNotes((notes, error) => {
            res.render("notes", {notes});
        })
    }
}