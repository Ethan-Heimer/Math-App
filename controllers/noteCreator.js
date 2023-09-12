const model = require("../model/noteDatabase.js");

async function Display(req, res){
    const fact = await GetNote(req.params.id, req.session.userId);
    
    res.render("createNote", {fact});
}

async function GetNote(id, userId){
    if(id == null)
        return null;

    return await model.GetNoteById(id, userId);
}

module.exports = {
    Display,
}