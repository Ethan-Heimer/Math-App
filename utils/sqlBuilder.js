const SB = require("./stringBuilder.js");

function SelectQuery(tableName, elementType, userId){
    const stringBuilder = new SB.StringBuilder();
    stringBuilder.append(`select ${elementType} from ${tableName} `);

    if(userId != null)
        stringBuilder.append(`where user_id = ${userId} `);

    stringBuilder.append("order by id desc");
    
    return stringBuilder.constructString();
}

function ConditionalSelectQuery(tableName, condition, elementType, userId){
    const stringBuilder = new SB.StringBuilder();
    stringBuilder.append(`select ${elementType} from ${tableName} `);

    stringBuilder.append(`where ${condition} `)

    if(userId != null)
        stringBuilder.append(`and user_id = ${userId}`);

    stringBuilder.append("order by id desc");
    
    return stringBuilder.constructString();
}

function ChainedSelectQuery(tableName, condition, conditionValues, chainType, elementType, userId){
    const stringBuilder = new SB.StringBuilder();
    stringBuilder.append(`select ${elementType} from ${tableName} where`);

    const format = new SQlValueFormatter();

    for(var i = 0; i < conditionValues.length; i++){
        stringBuilder.append(` ${condition} `)
        .appendFormat(conditionValues[i], format);

        if(i != conditionValues.length-1)
            stringBuilder.append(` ${chainType} `);
    }

    if(userId != null)
        stringBuilder.append(`and user_id = ${userId} `);

    stringBuilder.append("order by id desc");

    return stringBuilder.constructString();
}

function ArrayComarison(tableName, arrayName, value, queryFor, userId){
    let formattedVal = new SQlValueFormatter().format(value);
    return ConditionalSelectQuery(tableName, `${formattedVal} = any(${arrayName})`, queryFor, userId);
}

function ChainedArrayComparison(tableName, arrayName, values, chainType, queryFor, userId){
    const stringBuilder = new SB.StringBuilder();
    stringBuilder.append(`select ${queryFor} from ${tableName} where`);

    const format = new SQlValueFormatter();

    for(var i = 0; i < values.length; i++){
        stringBuilder.appendFormat(values[i], format).append(` = any(${arrayName})`);

        if(i != values.length-1)
            stringBuilder.append(` ${chainType} `);
    }

    if(userId != null)
        stringBuilder.append(`and user_id = ${userId}`);

    stringBuilder.append(" order by id desc");
    return stringBuilder.constructString();
}

function DeleteQuery(tableName, condition, userId){
    const stringBuilder = new SB.StringBuilder();

    stringBuilder.append(`delete from ${tableName} where ${condition}`);

    if(userId != null)
        stringBuilder.append(` and user_id = ${userId}`);

    return stringBuilder.constructString();
}

function InsertQuery(tableName, headers, values){
    const stringBuilder = new SB.StringBuilder();

    stringBuilder.append(`insert into ${tableName} (`)
                 .appendJoin(", ", headers)
                 .append(") values ")
                 .appendFormat(values, new SQLValueListFormatter());
            
    return stringBuilder.constructString();
}

function UpdateQuery(tableName, headers, values, condition, userId){
    const stringBuilder = new SB.StringBuilder();
    stringBuilder.append(`update ${tableName} set `);

    const formatter = new SQlValueFormatter(false);

    for(let i = 0 ; i < headers.length; i++){
        stringBuilder.append(`${headers[i]} = `)
                     .appendFormat(values[i], formatter);

        if(i != headers.length-1)
            stringBuilder.append(", ");
    }

    stringBuilder.append(` where ${condition}`);

    if(userId != null)
        stringBuilder.append(` and user_id = ${userId}`);

    return stringBuilder.constructString()
}


class SQlValueFormatter extends SB.IFormat{
    constructor(doubleQuoteString){
        super();
        
        this.dqs = doubleQuoteString;
    }
    
    format(input){
        return this.#convertValue(input);
    }

    #convertValue(value){
        switch(typeof(value))
        {
            case "string":
                return this.dqs == true ? `"${value}"` : `'${value}'`;
            case "object":
                return new SQLArrayFormater(true).format(value);
            default:
                return value;
        }
    }
}

class SQLArrayFormater extends SB.IFormat{
    format(input){
        const formatter = new SQlValueFormatter(true);
        let buffer = input.map(x => formatter.format(x)).join(", ");

        return `'{${buffer}}'`;
    }
}

class SQLValueListFormatter extends SB.IFormat{
    format(input){
        const formatter = new SQlValueFormatter();
        let buffer = input.map(x => formatter.format(x)).join(", ");

        return `(${buffer})`;
    }
}

module.exports = {
    SelectQuery,
    ConditionalSelectQuery,
    ChainedSelectQuery,
    ArrayComarison,
    ChainedArrayComparison,
    DeleteQuery,
    InsertQuery,
    UpdateQuery
}