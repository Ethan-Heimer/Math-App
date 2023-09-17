const SQLHandler = require("../utils/sqlHandler.js");
require('dotenv').config();

const tableData = {
    name: process.env.USER_TABLE_NAME,
    Username: process.env.USER_TABLE_USERNAME,
    Password: process.env.USER_TABLE_PASSWORD,
    Email: process.env.USER_TABLE_EMAIL
}

const SQL = new SQLHandler(tableData);

const AddNewUser = async (email, username, password) => {
    await SQL.AddElement([username, password, email]);
}

const GetUserByName = async (username) =>{
    const user = await SQL.GetElementByAttribute("Username", username);
    return user;
}

const GetUserById = async(id) => {
    const user = await SQL.GetElementById(id);
    return user;
}

module.exports = {
    AddNewUser,
    GetUserByName,
    GetUserById
}
