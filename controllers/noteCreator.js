const model = require("../model/noteDatabase.js");

const DisplayFromURLId = (req, res) => {
    model.GetNoteById(req.params.id, (note) => {
        Display(note)(req, res);
    })
}

function Display(note){
    return (req, res) => {
        res.render("createNote", {fact: note});
    }
}

module.exports = {
    Display,
    DisplayFromURLId
}