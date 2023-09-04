const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");
const stringBuilder = require("../utils/stringBuilder.js");

const DisplayNoteCreater = (req, res) =>{
    if(req.params.id != null){
        model.GetNoteById(req.params.id, (note, err) => {
            res.render("createNote", {fact: note});
        });
    }
    else{
        res.render("createNote", {fact: null});
    }
};

const AddNote = (req, res) => {
    model.AddNewNote(req.body.title, req.body.content, req.body.tags, (err) => {console.log(err)});

    res.redirect('/notes');    
};

const EditNote = (req, res) => {
    model.EditNote(req.params.id, req.body.title, req.body.content, req.body.tags);

    res.redirect('/notes');
};

const DeleteNote =(req, res) => {
    model.DeleteNote(req.params.id);

    res.redirect('/notes');
};


module.exports = {
    DisplayNoteCreater,
    AddNote,
    EditNote,
    DeleteNote,
}