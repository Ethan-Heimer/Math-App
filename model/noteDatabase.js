require('dotenv').config();

const tableData = {
    name: process.env.NOTE_TABLE_NAME,
    userId: process.env.NOTE_TABLE_USER_ID,
    noteTitle: process.env.NOTE_TABLE_NOTE_TITLE,
    noteContent: process.env.NOTE_TABLE_NOTE_CONTENT,
    noteTags: process.env.NOTE_TABLE_NOTE_TAGS
}

const SQLHandler = require("../utils/sqlHandler.js");
const SQL = new SQLHandler(tableData);

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
    await SQL.AddElement([title, content, tags]);
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
}