const users = require("../model/userDatabase.js");

const displayProfile = async (req, res) => {
    const name = req.body.user;

    try{
        const user = await users.GetUserByName(name);
        console.log(user);

        req.session.userViewing = user; 

        res.redirect(`/notes/${user.id}`);
    }
    catch{
        res.render("profileNotFound", {user: req.session.user});
    }
}

module.exports = {
    displayProfile
}