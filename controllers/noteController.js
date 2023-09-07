const model = require("../model/noteDatabase.js");

const AddNote = async (req, res) => {
    await model.AddNewNote(req.body.title, req.body.content, req.body.tags);

    res.redirect('/notes');    
};

const EditNote = async (req, res) => {
    await model.EditNote(req.params.id, req.body.title, req.body.content, req.body.tags);

    res.redirect('/notes');
};

const DeleteNote = async (req, res) => {
    await model.DeleteNote(req.params.id);

    res.redirect('/notes');
};


module.exports = {
    AddNote,
    EditNote,
    DeleteNote,
}