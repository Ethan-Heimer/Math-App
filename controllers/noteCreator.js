const model = require("../model/noteDatabase.js");

const DisplayFromURLId = async (req, res) => {
    const note = await model.GetNoteById(req.params.id);
    Display(note)(req, res);
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