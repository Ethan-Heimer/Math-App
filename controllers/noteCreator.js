const model = require("../model/noteDatabase.js"); 

async function Display(req, res){
    if(req.session.user == null)
    {
        res.redirect("/user/login");
        return;
    }
    
    const fact = await GetNote(req.params.id, req.session.user.Id);
    
    res.render("createNote", {fact, user: req.session.user});
}

async function GetNote(id, userId){
    if(id == null)
        return null;

    return await model.GetNoteById(id, userId);
}

module.exports = {
    Display,
}