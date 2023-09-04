const model = require("../model/noteDatabase.js");
const arrayBuilder = require("../utils/arrayBuilder");
const stringBuilder = require("../utils/stringBuilder.js");

function DisplayFiltersInBody(){
    return (req, res) => {
        const filters = arrayBuilder.GetStringArrayFromString(req.body.filters, ",")

        DisplayFilters(filters)(req, res);
    }
}

function DisplayFilters(filters){
    return (req, res) =>{
        if(filters.length != 0)
        {
            model.GetNotesByTag(filters, (notes) => {
                const ids = model.GetNoteIds(notes);
                Display(ids, filters)(req, res)})
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
    return (req, res) => {
        model.GetAllNoteIds(ids => {
            Display(ids)(req, res);
        })
    }
}

function Display(ids, filters){
    return (req, res) => {
        res.redirect(`/notes/${ids.length == 0 ? -1 : ids}&${filters == undefined ? "" : filters}`);
    }
}

const RenderDisplay = (req, res) => {
    const ids = arrayBuilder.GetIntArrayFromString(req.params.ids, ",");
    const filters = req.params.filters;

    model.GetNotesByIds(ids, (notes) => {
        res.render("notes", {notes, filters: filters});
    });
}

module.exports = {
   Display,
   DisplayIdsInEndpoint,
   DisplayFilters,
   DisplayFiltersInBody,
   DisplayAllNotes,
   RenderDisplay
}