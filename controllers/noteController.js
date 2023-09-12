const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder.js");

const AddNote = async (req, res) => {
    const tagArray = arrayBuilder.GetStringArrayFromString(req.body.tags, ",");

    console.log(req.body.color);
    await model.AddNewNote(req.body.title, req.body.content, tagArray, req.body.color, req.session.userId);

    res.redirect('/notes');    
};

const EditNote = async (req, res) => {
    const tagArray = arrayBuilder.GetStringArrayFromString(req.body.tags, ",");
    await model.EditNote(req.params.id, req.body.title, req.body.content, tagArray, req.body.color, req.session.userId);

    res.redirect('/notes');
};

const DeleteNote = async (req, res) => {
    await model.DeleteNote(req.params.id, req.session.userId);

    res.redirect('/notes');
};


module.exports = {
    AddNote,
    EditNote,
    DeleteNote,
}