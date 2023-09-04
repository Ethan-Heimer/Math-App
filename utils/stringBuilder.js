const arrayBuilder = require("./arrayBuilder.js");

function formatToSQLArray(string){
    //Poggers, Test => {"Poggers", "Test"}
    const elements = arrayBuilder.GetStringArrayFromString(string, ",");

    let resault = `{`;
    for(let i = 0; i < elements.length; i++){
        resault += `"${elements[i]}"`;

        if(!IfEndOfLoop(elements, i))
            resault += ', ';
    }
    resault += '}'

    return resault;
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

module.exports = {
    formatToSQLArray,
    constructSQLArrayComparison,
    constructSQLIntOrQueryFromArray,
    formatArrayToUrlArray
}