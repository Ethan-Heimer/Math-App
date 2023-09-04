const model = require("../model/noteDatabase.js");

module.exports = {
    GetAllNotes: (req, res) => {
        model.GetAllNotes((notes, error) => {
            res.render("notes", {notes});
        })
    }, 

    DisplayNoteCreater: (req, res) =>{
        if(req.params.id != null){
            model.GetNote(req.params.id, (note, err) => {
                res.render("createNote", {fact: note});
            });
        }
        else{
            res.render("createNote", {fact: null});
        }
    },

    AddNote: (req, res) => {
        model.AddNewNote(req.body.title, req.body.content, req.body.tags, (err) => {console.log(err)});

        res.redirect('/notes');    
    },

    EditNote: (req, res) => {
        model.EditNote(req.params.id, req.body.title, req.body.content, req.body.tags);

        res.redirect('/notes');
    },

    DeleteNote: (req, res) => {
        model.DeleteNote(req.params.id);

        res.redirect('/notes');
    }
}