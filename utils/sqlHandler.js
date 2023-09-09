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

    async GetElementById(id){
        const sql = SQLBuilder.SelectQuery(this.tableData.name, `id = ${id}`, '*');
        console.log(sql);

        return (await this.client.query(sql)).rows[0];
    }

    async GetElementsFromIds(ids){
        const sql = SQLBuilder.ChainedSelectQuery(this.tableData.name, "id = ", ids, "or", "*");
        console.log(sql);

        return (await this.client.query(sql)).rows;
    }

    async GetElementsByArrayAttribute(attributeName, values){
        const sql = SQLBuilder.ChainedArrayComparison(this.tableData.name, this.#GetTableValue(attributeName), values, "or", "*");
        console.log(sql);
        
        return (await this.client.query(sql)).rows;
    }

    //GetElementsByAttribute (ill make this hoe when i feel like it)

    async GetAllElements(){
        const sql = SQLBuilder.SelectQuery(this.tableData.name, "", "*");
        console.log(sql);
       
        return (await this.client.query(sql)).rows;
    }

    async DeleteElement(id){
        //update too sql builder
        const sql = SQLBuilder.DeleteQuery(this.tableData.name, `id = ${id}`);

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