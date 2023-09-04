const {Client} = require("pg");
require('dotenv').config();
const stringBuilder = require("../utils/stringBuilder.js");

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

client.connect();

const GetAllNotes = async (callback) => {
    client.query("select * from notes", (err, res) => {
        if(!err){
           callback(res.rows.sort((a, b) => a.id-b.id), null)
        }
        else{
            console.log(null, err);
        }
    });
}

const GetNote = (id, callback) => {
    client.query(`select * from notes where id = ${id}`, (err, res) => {
        if(!err){
            callback(res.rows[0], null)

            console.log(res.rows[0]);
        }
        else{
             console.log(null, err);
        }
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

module.exports = {
    GetAllNotes,
    AddNewNote,
    GetNote,
    EditNote,
    DeleteNote
}