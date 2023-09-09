const SQLHandler = require("../utils/sqlHandler.js");

require('dotenv').config();

const tableData = {
    name: process.env.NOTE_TABLE_NAME,
    userId: process.env.NOTE_TABLE_USER_ID,
    noteTitle: process.env.NOTE_TABLE_NOTE_TITLE,
    noteContent: process.env.NOTE_TABLE_NOTE_CONTENT,
    noteTags: process.env.NOTE_TABLE_NOTE_TAGS
}
const SQL = new SQLHandler(tableData);


const GetNoteId = async(note) => {
    return (await SQL.GetElementId(note));
}

const GetNoteIds = async(notes) => {
    const ids = [];

    for(var i = 0; i < notes.length; i++){
        let id = await GetNoteId(notes[i]);
        ids.push(id);
    }

    return ids;
}

const GetNoteById = async(id) => {
    return await SQL.GetElementById(id);
}

const GetNotesByIds = async (ids) => {
    return await SQL.GetElementsFromIds(ids);
}

const GetNotesByTag= async (tags) => {
    return await SQL.GetElementsByArrayAttribute("noteTags", tags);
}

const GetAllNotes = async () => {
    return await SQL.GetAllElements();
}

const GetAllNoteIds = async () => {
    const notes = await SQL.GetAllElements();
    return await SQL.GetElementsIds(notes);
}

const DeleteNote = async (id) => {
   await SQL.DeleteElement(id);
}

const AddNewNote = async (title, content, tags) => {
    await SQL.AddElement([1, title, content, tags]);
}

const EditNote = async (id, title, content, tags) => {
    await SQL.UpdateElement(id, [1, title, content, tags]);
}

module.exports = {
    GetAllNotes,
    AddNewNote,
    GetNoteById,
    EditNote,
    DeleteNote,
    GetNotesByTag,
    GetNotesByIds,
    GetAllNoteIds,
    GetNoteId,
    GetNoteIds
}