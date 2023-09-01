const model = require("../model/noteDatabase.js");

module.exports = {
    GetAllNotes: (req, res) => {
        model.GetAllNotes((notes, error) => {
            res.render("notes", {notes});
        })
    }, 

    DisplayNoteCreater: (req, res) =>{
        res.render("createNote");
    },

    AddNote: (req, res) => {
        model.AddNewNote(req.body.title, req.body.content, req.body.tags, (err) => {console.log(err)});

        res.redirect('/notes');    
    }
   
}