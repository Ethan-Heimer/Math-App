const {Client} = require("pg");
require('dotenv').config();
const stringBuilder = require("../stringBuilder.js");

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
           callback(res.rows, null)
        }
        else{
            console.log(null, err);
        }
    });
}

const AddNewNote = (title, content, tags, callback) => {
    let formattedTags = stringBuilder.formatToSQLArray(tags);
   
    try{
        client.query(`
        insert into notes (user_id, note_title, note_content, note_tags)
        values (1, '${title}', '${content}', '${formattedTags}')
        `);
    }
    catch{
        callback(error)
    }

    
}

module.exports = {
    GetAllNotes: GetAllNotes,
    AddNewNote: AddNewNote,
}