const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");
const userModel = require("../model/userDatabase.js");

async function Display(req, res){
    try{
        const user = await userModel.GetUserById(req.params.userId);
        const notes = await GetNotesByFilter(req.params.filters, user.id);
    
        const username = req.params.userId == req.session.user?.id ? "Your" : `${user.username}'s`;
    
        res.render("notes", {notes, 
                            filters: req.params.filters, 
                            editable: req.session.user != null && req.params.userId == req.session.user?.id, 
                            userId: req.params.userId, 
                            username, 
                            user: req.session.user ? req.session.user : null})
    }
    catch (err){
        res.render("profileNotFound", {user: req.session.user });
        console.log(err);
    }
}
    

async function GetNotesByFilter(filters, userId){
    if(filters == null)
        return await model.GetAllNotes(userId);
    
    const filtersArray = arrayBuilder.GetStringArrayFromString(filters, ",")
    const notes = await model.GetNotesByTag(filtersArray, userId);

    return notes;
}

async function SetFilters(req, res){
    res.redirect(`/notes/${req.params.userId}/${req.body.filters}`);
}

module.exports = {
   Display, 
   SetFilters
}