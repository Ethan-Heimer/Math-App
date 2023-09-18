const users = require("../model/userDatabase.js")

const getUser = async(req, res) => {
    console.log("Requested");

    try{
        console.log(req.params.id);
        
        const user = await users.GetUserById(req.params.id);

        console.log(user);

        res.status(200).send({
            id: user.id,
            username: user.username
        });
    }
    catch{
        res.status(404).send("User Not Found");
    }
}

const getCurrentViewedUser = async(req, res) => {
    try{
        console.log(req.session.userViewing, "current");
        res.status(200).send({
            id: req.session.userViewing.id,
            username: req.session.userViewing.username
        });
    }
    catch{
        res.status(404).send("cannot get a curent user");
    }
}

module.exports = {
    getUser,
    getCurrentViewedUser
}