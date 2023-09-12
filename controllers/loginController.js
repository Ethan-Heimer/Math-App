const bcrypt = require("bcrypt");
const model = require("../model/userDatabase.js");


const addUser = async (req, res) => {
    try{
        if(req.body.password == req.body.password2){
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            await model.AddNewUser(req.body.email, req.body.username, hashedPass);
        
            res.redirect("/user/login");
        }
        else{
            displayCreator("Passwords do not match", 200, req.body.email, req.body.username)(req, res);
        }
    }
    catch(err){
        switch(err.message){
            case 'duplicate key value violates unique constraint "users_username_key"':
                displayCreator("Username Already Exists, Please make a new one :)", 200)(req, res);
                break;

            case 'duplicate key value violates unique constraint "users_email_key"':
                displayCreator("Email already exists, you might already have an account :P", 200)(req, res);
                break;

            default: 
                displayCreator("Internal Error Occured, Try Again, Error: ", 500)(req, res);
                break;
        }
    }
}

const login = async (req, res) => { 
    try
    {
        const username = req.body.username;
        const password = req.body.password;
    
        const user = await model.GetUserByName(username);
    
        if(await bcrypt.compare(password, user.password)){
            req.session.userId = user.id;
            console.log(req.session.userId);
            res.redirect(`/notes/${req.session.userId}`);
        }
        else{
           displayLogin("Username or Password is wrong", 200, req.body.username)(req, res)
        }
    }
    catch(err){
        console.log(err.message);
        displayLogin("Internal Error Occured, Try Again, Error: " + err.message, 500)(req, res)
    }
}

function displayLogin(error, status, defUsername){
    return (req, res) => {
        console.log("rendered");
        res.status(status).render("login", {create: false, error, username: defUsername == null ? "" : defUsername});
    }
}

function displayCreator(error, status, defEmail, defUsername){
    return (req, res) => {
        res.status(status).render("login", {create: true, error, email: defEmail == null ? "" : defEmail, username: defUsername == null ? "" : defUsername});
    }
}


module.exports= {
    addUser,
    displayLogin,
    displayCreator,
    login
}