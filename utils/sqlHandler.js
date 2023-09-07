const {Client} = require("pg");
const stringBuilder = require("./stringBuilder.js");

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
        return elements.map(x => GetElementId(x));
    }

    async GetElementById(id){
        return (await this.client.query(stringBuilder.constructSQLSelectQuery(this.tableData.name, `id = ${id}`))).rows
    }

    async GetElementsFromIds(ids){
        let orCondition = stringBuilder.constructSQLIntOrQueryFromArray(ids, "id =")
        return (await this.client.query(stringBuilder.constructSQLSelectQuery(this.tableData.name, orCondition))).rows;
    }

    async GetElementsByArrayAttribute(attributeName, value){
        let q = stringBuilder.constructSQLArrayComparison(value, `any (${this.#GetTableValue(attributeName)})`);
        return (await this.client.query(stringBuilder.constructSQLSelectQuery(this.tableData.name, q))).rows;
    }

    //GetElementsByAttribute

    async GetAllElements(){
       return (await this.client.query(stringBuilder.getSelectQuery(this.tableData.name))).rows;
    }

    async DeleteElement(id){
       await this.client.query(stringBuilder.constructDeleteQuery(this.tableData.name, `id = ${id}`));
    }

    async AddElement(values){
       await this.client.query(stringBuilder.constructInsertQuery(this.tableData.name, this.#GetTableTitles(), values));
    }

    async UpdateElement(id, values){
        await this.client.query(stringBuilder.constructEditQuery(this.tableData.name, this.#GetTableTitles(), values, id));
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