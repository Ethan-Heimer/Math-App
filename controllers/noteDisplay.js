const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");

/*
function DisplayFiltersInBody(){
    return (req, res) => {
        const filters = arrayBuilder.GetStringArrayFromString(req.body.filters, ",")

        DisplayFilters(filters)(req, res);
    }
}

function DisplayFilters(filters){
    return async (req, res) =>{
        if(filters.length != 0)
        {
            const notes = await model.GetNotesByTag(filters);
            const ids = await model.GetNoteIds(notes);

            console.log(ids);

            Display(ids, filters)(req, res)
           
        }
        else{
           DisplayAllNotes()(req, res);
        }   
    };
}

function DisplayIdsInEndpoint(){
    return (req, res) => {
        const ids = arrayBuilder.GetIntArrayFromString(req.params.ids, ",");

        Display(ids)(req, res);
    }
}

function DisplayAllNotes(){
    return async (req, res) => {
        const ids = await model.GetAllNoteIds();
        Display(ids)(req, res);
    }
}

function Display(ids, filters){
    return (req, res) => {
        res.redirect(`/notes/${ids.length == 0 ? -1 : ids}&${filters == undefined ? "" : filters}`);
    }
}

const RenderDisplay = async (req, res) => {
    const ids = arrayBuilder.GetIntArrayFromString(req.params.ids, ",");
    const filters = req.params.filters;

    const notes = await model.GetNotesByIds(ids)
    res.render("notes", {notes, filters: filters});
}
*/

async function Display(req, res){
   
    const notes = await GetNotesByFilter(req.params.filters, req.session.userId);

    res.render("notes", {notes, filters: req.params.filters})
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
    res.redirect(`/notes/${req.body.filters}`);
}


module.exports = {
   Display, 
   SetFilters
}