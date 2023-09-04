function GetStringArrayFromString(string, splitChar){
    if(string == '')
        return [];
    
    let array = string.split(splitChar);
    array = array.map(x => x.trim());

    return array;
}

function GetIntArrayFromString(string, splitChar){
    array = GetStringArrayFromString(string, splitChar);
    array = array.map(x => parseInt(x));

    return array.filter(x => x != NaN);
}

module.exports = { 
    GetStringArrayFromString,
    GetIntArrayFromString
}