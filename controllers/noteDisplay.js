const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");

async function Display(req, res){
    const notes = await GetNotesByFilter(req.params.filters, req.params.userId);

    res.render("notes", {notes, filters: req.params.filters, editable: req.params.userId == req.session.userId, userId: req.params.userId})
}

async function GetNotesByFilter(filters, userId){
    if(filters == null)
        return await model.GetAllNotes(userId);
    
        console.log(userId, "user id");
    const filtersArray = arrayBuilder.GetStringArrayFromString(filters, ",")
    const notes = await model.GetNotesByTag(filtersArray, userId);

    return notes;
}

async function SetFilters(req, res){
    console.log(req.params.userId);
    res.redirect(`/notes/${req.params.userId}/${req.body.filters}`);
}

module.exports = {
   Display, 
   SetFilters
}