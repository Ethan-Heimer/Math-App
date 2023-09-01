function formatToSQLArray(string){
    //Poggers, Test => {"Poggers", "Test"}

    let elements = string.split(",");
    elements = elements.map(x => x.trim());

    let resault = "{";
    for(let i = 0; i < elements.length; i++){
        resault += `"${elements[i]}"`;

        if(i != elements.length-1)
            resault += ", ";
    }
    resault += "}"

    return resault;
}

module.exports = {
    formatToSQLArray
}