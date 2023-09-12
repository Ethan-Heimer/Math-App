const {Client} = require("pg");
const SQLBuilder = require("./sqlBuilder.js");

require('dotenv').config();

module.exports = class SQLHandler{
    constructor(tableData){
        this.tableData = tableData;

        this.client = new Client({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        });
        this.client.connect();
    }

    GetElementId = (element) => parseInt(element.id);

    GetElementsIds = (elements) => {
        return elements.map(x => this.GetElementId(x));
    }

    async GetElementById(id, userId){
        const sql = SQLBuilder.ConditionalSelectQuery(this.tableData.name, `id = ${id}`, '*', userId);
        console.log("Get Element By Id", sql);

        return (await this.client.query(sql)).rows[0];
    }

    async GetElementsFromIds(ids, userId){
        const sql = SQLBuilder.ChainedSelectQuery(this.tableData.name, "id = ", ids, "or", "*", userId);
        console.log(sql);

        return (await this.client.query(sql)).rows;
    }

    async GetElementsByArrayAttribute(attributeName, values, userId){
        const sql = SQLBuilder.ChainedArrayComparison(this.tableData.name, this.#GetTableValue(attributeName), values, "or", "*", userId);
        console.log(sql);
        
        return (await this.client.query(sql)).rows;
    }

    async GetElementByAttribute(attributeName, value, userId){
        const sql = SQLBuilder.ConditionalSelectQuery(this.tableData.name, `${this.#GetTableValue(attributeName)} = '${value}'`, "*", userId);
        console.log("Get Element By Attribute", sql);
       
        return (await this.client.query(sql)).rows[0];
    }

    async GetAllElements(userId){
        const sql = SQLBuilder.SelectQuery(this.tableData.name, "*", userId);
        console.log(sql);
       
        return (await this.client.query(sql)).rows;
    }

    async DeleteElement(id, userId){
        //update too sql builder
        const sql = SQLBuilder.DeleteQuery(this.tableData.name, `id = ${id}`, userId);

        await this.client.query(sql);
    }

    async AddElement(values){
        const sql = SQLBuilder.InsertQuery(this.tableData.name, this.#GetTableTitles(), values);
        console.log(sql);
       
        await this.client.query(sql);
    }

    async UpdateElement(id, values){
        const sql = SQLBuilder.UpdateQuery(this.tableData.name, this.#GetTableTitles(), values, `id = ${id}`);
       
        this.client.query(sql);
    }

    #GetTableValue(key){
        return this.tableData[key];
    }

    #GetTableTitles(){
       const titles = Object.values(this.tableData);
       titles.shift();
       return titles;
    }

}