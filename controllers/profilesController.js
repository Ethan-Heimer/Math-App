const users = require("../model/userDatabase.js");

const displayProfile = async (req, res) => {
    const name = req.body.user;

    try{
        const user = await users.GetUserByName(name);

        res.redirect(`/notes/${user.id}`);
    }
    catch{
        res.render("profileNotFound");
    }
}

module.exports = {
    displayProfile
}