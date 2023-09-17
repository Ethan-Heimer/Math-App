class StringBuilder {
    constructor(){
        this.string = "";
    }

    append(input){
        this.string += input;

        return this;
    }

    appendJoin(char, array){
        this.append(array.join(char));

        return this;
    }

    appendFormat(input, IFormat){
       this.append(IFormat.format(input));

       return this;
    }

    clear(){
       this.string = "";

       return this;
    }

    insert(index, string){
        let newString = this.string.split('');
        newString.splice(index, 0, string.toString());
        this.string = newString.join('');

        return this;
    }

    insertJoin(index, array, char)
    {
        this.insert(index, array.join(char));

        return this;
    }

    insertFormat(index, input, IFormat){
        this.insert(index, IFormat.format(input));

        return this;
    }

    remove(indexOne, indexTwo){
        this.string = this.string.split('').splice(indexOne, indexTwo).join('');

        return this;
    }

    constructString(){
        return this.string;
    }
}

class IFormat{
    format(string){}
}


module.exports = {
    StringBuilder,
    IFormat
}