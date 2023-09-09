const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");

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

module.exports = {
   Display,
   DisplayIdsInEndpoint,
   DisplayFilters,
   DisplayFiltersInBody,
   DisplayAllNotes,
   RenderDisplay
}