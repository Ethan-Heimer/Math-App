const SQLHandler = require("../utils/sqlHandler.js");

require('dotenv').config();

const tableData = {
    name: process.env.NOTE_TABLE_NAME,
    userId: process.env.NOTE_TABLE_USER_ID,
    noteTitle: process.env.NOTE_TABLE_NOTE_TITLE,
    noteContent: process.env.NOTE_TABLE_NOTE_CONTENT,
    noteTags: process.env.NOTE_TABLE_NOTE_TAGS,
    noteColor: process.env.NOTE_TABLE_NOTE_COLOR
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

const GetNoteById = async(id, userId) => {
    return await SQL.GetElementById(id, userId);
}

const GetNotesByIds = async (ids, userId) => {
    return await SQL.GetElementsFromIds(ids, userId);
}

const GetNotesByTag= async (tags, userId) => {
    return await SQL.GetElementsByArrayAttribute("note_tags", tags, userId);
}

const GetAllNotes = async (userId) => {
    return await SQL.GetAllElements(userId);
}

const GetAllNoteIds = async (userId) => {
    const notes = await SQL.GetAllElements(userId);
    return await SQL.GetElementsIds(notes);
}

const DeleteNote = async (id, userId) => {
   await SQL.DeleteElement(id, userId);
}

const AddNewNote = async (title, content, tags, color, userId) => {
    await SQL.AddElement([userId, title, content, tags, color]);
}

const EditNote = async (id, title, content, tags, color, userId) => {
    await SQL.UpdateElement(id, [userId, title, content, tags, color]);
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