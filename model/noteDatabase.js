const {Client} = require("pg");
require('dotenv').config();
const stringBuilder = require("../utils/stringBuilder.js");
const noteController = require("../controllers/noteController.js");

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

client.connect();

const GetAllNotes = (callback) => {
    client.query("select * from notes", (err, res) => {
        if(!err){
           callback(res.rows.sort((a, b) => a.id-b.id), null)
        }
        else{
            console.log(err, "Get All Notes");
        }
    });
}

const GetNoteById = (id, callback) => {
    client.query(`select * from notes where id = ${id}`, (err, res) => {
        if(!err){
            callback(res.rows[0], null)
        }
        else{
             console.log(err, " Get One Note by Id");
        }
    })
}

const GetNotesByIds = (ids, callback) => {
    let orCondition = stringBuilder.constructSQLIntOrQueryFromArray(ids, "id =")

    client.query(`select * from notes where ${orCondition}`, (err, res) => {
        if(!err){
            callback(res.rows, null);
        }
        else{
             console.log(err, " Get Notes By Ids");
        }
    })
}

const GetAllNoteIds = (callback) => {
    GetAllNotes((notes, err) => {
        const ids = notes.map(x => x.id);

        callback(ids, err);
    })
}

const AddNewNote = (title, content, tags, callback) => {
    let formattedTags = stringBuilder.formatToSQLArray(tags);

    client.query(`
    insert into notes (user_id, note_title, note_content, note_tags)
    values (1, '${title}', '${content}', '${formattedTags}')
    `);
}

const EditNote = (id, title, content, tags) => {
    let formattedTags = stringBuilder.formatToSQLArray(tags);
    
    client.query(`update notes 
                set note_title = '${title}', 
                    note_content = '${content}',
                    note_tags = '${formattedTags}'
                where id = ${id};`);
}

const DeleteNote = (id) => {
    client.query(`delete from notes where id = ${id}`);
}

const GetNotesByTag = async (tags, callback) => {
    let q = stringBuilder.constructSQLArrayComparison(tags, "any (note_tags)");

    client.query(`select * from notes where ${q};`, (err, res) => {
        if(!err){
            callback(res.rows.sort((a, b) => a.id-b.id), null)
         }
         else{
             console.log(err, "Get Notes By Tag");
         }
    });
}

const GetNoteId = (note) => note.id;
const GetNoteIds = (notes) => {
    return notes.map(x => GetNoteId(x));
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
    GetNoteIds,
}