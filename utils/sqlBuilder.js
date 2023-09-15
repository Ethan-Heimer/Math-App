const SB = require("./stringBuilder.js");

class SQLBuilder{
    constructor(){
        this.sql = new SB.StringBuilder();

        this.stack = [];
    }

    Select(key, tableName){
        const token = this.#CreateToken(this.operationTypes["Command"], this.#GetId(), () => {
            this.sql.append(`Select ${key} from ${tableName}`);
        })

        this.#PushStack(token);

        return this;
    }

    Where(condition){
        const token = this.#CreateToken(this.operationTypes["Append"], this.#GetId(),  () => {
            this.sql.append(" where ")
            this.sql.appendFormat({
                condition: condition.condition,
                value: condition.value
            }, condition.format);
        })

        this.#PushStack(token);

        return this;
    }

    
    And(condition){
        const token = this.#CreateToken(this.operationTypes["Append"], this.#GetId(),  () => {
            this.sql.append(" and ")
            this.sql.appendFormat({
                condition: condition.condition,
                value: condition.value
            }, condition.format);
        })

        this.#PushStack(token);

        return this;
    }
    

    Or(condition){
        const token = this.#CreateToken(this.operationTypes["Append"], this.#GetId(),  () => {
            this.sql.append(" or ")
            this.sql.appendFormat({
                condition: condition.condition,
                value: condition.value
            }, condition.format);
        })

        this.#PushStack(token);

        return this;
    }

    
    WhereIts(operation, conditions){
        for(var i = 0; i < conditions.length; i++){
            if(this.#PreviousToken().operation === this.operationTypes["Command"])
                this.Where(conditions[i]);
            else{
               switch(operation.toLowerCase())
               {
                case "and":
                    this.And(conditions[i]);
                    break;
                case "or":
                    this.Or(conditions[i]);
                    break;
               }
            }
        }

        return this;
    }

    Delete(tableName){
        const token = this.#CreateToken(this.operationTypes["Command"], this.#GetId(),  () => {
            this.sql.append(`delete from ${tableName}`);
        })

        this.#PushStack(token);

        return this;
    }

    Insert(tableName, columns, values){
        const token = this.#CreateToken(this.operationTypes["Command"], this.#GetId(),  () => {
            this.sql.append(`insert into ${tableName} (`)
                            .appendJoin(", ", columns)
                            .append(") values ")
                            .appendFormat(values, new SQLValueListFormatter());
        });

        this.#PushStack(token);

        return this;
    }

    Update(tableName) {
        const token = this.#CreateToken(this.operationTypes["Command"], this.#GetId(), () => {
            this.sql.append(`update ${tableName}`)
        });

        this.#PushStack(token);

        return this;
    }

    Set(title, value){
        const id = this.#GetId()
        
        const token = this.#CreateToken(this.operationTypes["Append"], id, () => {
            console.log(this.#PreviousToken(id).spesOp);

            if(this.#PreviousToken(id).operation == this.operationTypes["List"])
                this.sql.append(", ")
            else if(this.#PreviousToken(id).operation == this.operationTypes["Command"])
                this.sql.append(" set ");

            this.sql.append(`${title} = `)
                    .appendFormat(value, new SQlValueFormatter(false));
        });

        this.#PushStack(token);

        return this;
    }

    Order(attribute, order){
        const token = this.#CreateToken(this.operationTypes["Append"], this.#GetId(), () => {
            this.sql.append(`order by ${attribute} ${order}`);
        });

        this.#PushStack(token);

        return this;
    }

    End(){
        this.stack.forEach(token => {
            token.toAppend();
        })
        this.sql.append(";");

        const builtStatement = this.sql.constructString();

        this.sql.clear();
        this.stack = [];

        return builtStatement;
    }


    #PushStack(token){
        this.stack.push(token);
    }

    #CreateToken(operationType, id, action){
        return {
            operation: operationType,
            toAppend: action,
            id
        }
    }

    #PreviousToken(id){
        if(id)
            return this.stack[id-1];
        else
            return this.stack[this.stack.length-1];
    }

    #GetId(){
        return this.stack.length;
    }

    operationTypes = { //sub for enum
        "Command": 0,
        "Append": 1,
    }
}

class SQlValueFormatter extends SB.IFormat{
    constructor(doubleQuoteString){
        super();
        
        this.dqs = doubleQuoteString;
        console.log(doubleQuoteString);
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

class SQLAttributeFormatter extends SB.IFormat{
    format(input){
        const formatter = new SQlValueFormatter(false);

        return `${input.condition} ${formatter.format(input.value)}`;
    }
}

class SQLArrayFormatter extends SB.IFormat{
    format(input){
        const formatter = new SQlValueFormatter(false);

        return `${formatter.format(input.value)} ${input.condition}`;
    }
}

module.exports = {
    SQLBuilder,
    ConditionFormat: { 
        "Attribute": new SQLAttributeFormatter,
        "Array": new SQLArrayFormatter,
    }, 
    Condition: (type, condition, value) => {
        return {
            format: type,
            condition: condition,
            value: value
        }
    },
    SortOrder: {
        "Ascending": "asc",
        "Descending": "desc"
    }
}
