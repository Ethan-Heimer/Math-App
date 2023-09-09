const arrayBuilder = require("./arrayBuilder.js");

function formatValuesToList(array){
        return array.join(", ");
}

function formatObjectValuesToList(object){
   return formatValuesToList(Object.values(object));
}

function formatToSQLArray(string){
    //Poggers, Test => {"Poggers", "Test"}
    const elements = arrayBuilder.GetStringArrayFromString(string, ",");

    let resault = "'{";
    for(let i = 0; i < elements.length; i++){
        resault += `"${elements[i]}"`;

        if(!IfEndOfLoop(elements, i))
            resault += ', ';
    }
    resault += "}'"

    return resault;
}

function formatDataToSQL(data){
    return data.map(x => {
        switch(typeof(x)){
            case "string":
                return `'${x}'`
            case "object":
                return formatToSQLArray(formatValuesToList(x));

            default:
                return x;
        }
    }).join(", ");
}

function constructSQLArrayComparison(array, contition){ //give better name
    //["Poggers", "Test"] => "poggers" + condition or "Test" + condition...

    let resault = "";
    for(var i = 0; i < array.length; i++){
        resault += `'${array[i]}' = ${contition}`;

        if(!IfEndOfLoop(array, i))
            resault += " or ";
    }

    return resault;
}

function constructSQLIntOrQueryFromArray(array, condition){ //give better name
    //["Poggers", "Test"] => condition + 'poggers' or condition + 'test'    
    let res = "";

    for(var i = 0; i < array.length; i++){
        res += `${condition} ${array[i]}`;

        if(!IfEndOfLoop(array, i))
            res += " or ";
    }

    return res;
}

function formatArrayToUrlArray(array){
    //[23, 24, 25] => 23,24,25
    let res = '';

    for(var i = 0; i < array.length; i++){
        res += array[i];

        if(!IfEndOfLoop(array, i))
            res += ",";
    }

    return res;
}

function IfEndOfLoop(array, i){
    return i == array.length-1;
}

function constructSQLSelectQuery(tableName, condition){
    return `select * from ${tableName} where ${condition} order by id desc`;
}

function getSelectQuery(tableName){
    return `select * from ${tableName} order by id desc`;
}

function constructDeleteQuery(tableName, condition){
    return `delete from ${tableName} where ${condition}`;
}

function constructInsertQuery(tableName, titles, values){
    /*insert into ${tableData.name} (${tableData.userId}, ${tableData.noteTitle}, ${tableData.noteContent}, ${tableData.noteTags})
    values (1, '${title}', '${content}', '${formattedTags}')*/
    let tableList = formatValuesToList(titles);
    let valueList = formatDataToSQL(values);

    console.log(`insert into ${tableName} (${tableList})
    values (${valueList})`);

    return `insert into ${tableName} (${tableList})
            values (${valueList})`;
}

function constructEditQuery(tableName, titles, values, id){
    const formattedValues = formatDataToSQL(values);
    const body = formatAssignArrays(titles, formattedValues.split(","));

    console.log(formattedValues);
    console.log(`update ${tableName} set ${body} where id = ${id}`);

    return `update ${tableName} set ${body} where id = ${id}`
}

function formatAssignArrays(arrayOne, arrayTwo){
    let res = [];
    for(var i = 0; i < arrayOne.length; i++){
        console.log(arrayTwo[i]);
        res.push(`${arrayOne[i]} = ${arrayTwo[i]}`);
    }
    return res.join(", ");
}

module.exports = {
    formatToSQLArray,
    constructSQLArrayComparison,
    constructSQLIntOrQueryFromArray,
    formatArrayToUrlArray,
    constructSQLArrayComparison,
    getSelectQuery,
    constructDeleteQuery,
    constructInsertQuery,
    formatObjectValuesToList,
    constructSQLSelectQuery,
    constructEditQuery, 
}