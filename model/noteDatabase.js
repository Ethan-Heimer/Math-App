const {Client} = require("pg");
require('dotenv').config();

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

module.exports = {
    GetAllNotes: GetAllNotes,
}