const model = require("../model/noteDatabase.js");

async function Display(req, res){
    const fact = await GetNote(req.params.id);
    
    res.render("createNote", {fact});
}

async function GetNote(id){
    if(id == null)
        return null;

    return await model.GetNoteById(id);
}

module.exports = {
    Display,
}