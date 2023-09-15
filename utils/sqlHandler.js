const {Client} = require("pg");
const SQL= require("./sqlBuilder.js");

require('dotenv').config();

class SQLConnectionHandler{
    static connected = false;

    static client = null;
    
    static OpenConnection(){
       if(!this.connected)
       {
            this.client = new Client({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            });

            this.client.connect();
            this.connected = true;
       }

       return this.client;
    }

    static CloseConnection() {
        if(this.connected)
        {
            this.client.end();
            this.connected = false;
        }
    }
}

module.exports = class SQLHandler{
    constructor(tableData){
        this.tableData = tableData;

        this.client = SQLConnectionHandler.OpenConnection();
    }

    GetElementId = (element) => parseInt(element.id);

    GetElementsIds = (elements) => {
        return elements.map(x => this.GetElementId(x));
    }

    async GetElementById(id, userId){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Select("*", this.tableData.name).Where(SQL.Condition(SQL.ConditionFormat["Attribute"], "Id =", id));

        if(userId != null)
            sqlBuilder.And(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        return (await this.client.query(statement)).rows[0];
    }

    async GetElementsFromIds(ids, userId){
        const sqlBuilder = new SQL.SQLBuilder();
        const conditions = ids.map(x => SQL.Condition(SQL.ConditionFormat["Attribute"], "id =", x))

        sqlBuilder.Select("*", this.tableData.name).WhereIts("or", conditions);

        if(userId != null)
            sqlBuilder.And(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        return (await this.client.query(statement)).rows;
    }

    async GetElementsByArrayAttribute(attributeName, values, userId){
        const sqlBuilder = new SQL.SQLBuilder();
        const conditions = values.map(x => SQL.Condition(SQL.ConditionFormat["Array"], ` = any(${attributeName}) `, x));
        
        sqlBuilder.Select("*", this.tableData.name).WhereIts("or", conditions);

        if(userId != null)
            sqlBuilder.And(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);
        
        const statement = sqlBuilder.End();
        console.log(statement);

        return (await this.client.query(statement)).rows;
    }

    async GetElementByAttribute(attributeName, value, userId){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Select("*", this.tableData.name).Where(SQL.Condition(SQL.ConditionFormat["Attribute"], `${this.#GetTableValue(attributeName)} =`, value));

        if(userId != null)
            sqlBuilder.And(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        return (await this.client.query(statement)).rows[0];
    }

    async GetAllElements(userId){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Select("*", this.tableData.name);

        if(userId != null)
            sqlBuilder.Where(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        return (await this.client.query(statement)).rows;
    }

    async DeleteElement(id, userId){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Delete(this.tableData.name).Where('id = ', id);
        if(userId != null)
            sqlBuilder.And(SQL.Condition(SQL.ConditionFormat["Attribute"], "user_id =", userId));

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        await this.client.query(statement);
    }

    async AddElement(values){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Insert(this.tableData.name, this.#GetTableTitles(), values)

        sqlBuilder.Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);
        await this.client.query(statement);
    }

    async UpdateElement(id, values){
        const sqlBuilder = new SQL.SQLBuilder();
        sqlBuilder.Update(this.tableData.name);

        const titles = this.#GetTableTitles();

        for(var i = 0; i < titles.length; i++)
            sqlBuilder.Set(titles[i], values[i]);

        sqlBuilder.Where(SQL.Condition(SQL.ConditionFormat["Attribute"], "id =", id)).Order("Id", SQL.SortOrder["Descending"]);

        const statement = sqlBuilder.End();
        console.log(statement);

        await this.client.query(statement);
    }

    #GetTableValue(key){
        return this.tableData[key];
    }

    #GetTableTitles(){
       const titles = Object.values(this.tableData);
       titles.shift();
       return titles;
    }

    async Test(){
        console.log((await (this.client.query("Select * from users where username = 'CrookedShaft445'"))).rows);
    }

}