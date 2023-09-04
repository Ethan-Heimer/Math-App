const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");
const stringBuilder = require("../utils/stringBuilder.js");

const DisplayAllNotes = (req, res) => {
    model.GetAllNoteIds((ids, err) => {
        res.redirect(`/notes/${stringBuilder.formatArrayToUrlArray(ids)}&`);
    })
};

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

const FilterNotes = (req, res) => {
    const filters = arrayBuilder.GetStringArrayFromString(req.body.filters, ",")

    console.log(filters.length);
    
    if(filters.length > 0){
        model.GetNotesByTag(filters, (notes) => {
            const ids = model.GetNoteIds(notes);
            res.redirect(`/notes/${ids}&${filters}`);
        });
    }
    else{
       res.redirect('/notes/')
    }
};

const DisplayNotes = (req, res) => {
    const ids = arrayBuilder.GetIntArrayFromString(req.params.ids, ",");
   
    model.GetNotesByIds(ids, (notes) => {
        console.log(notes);
        res.render("notes", {notes, filters: req.params.filters});
    });
};

module.exports = {
    DisplayAllNotes,
    DisplayNoteCreater,
    AddNote,
    EditNote,
    DeleteNote,
    FilterNotes,
    DisplayNotes
}