const model = require("../model/database.js");

module.exports = {
    GetAllUsers: (req, res) => {
        model.GetAllUsers((users, error) => {
            res.render("users", {users});
        })
    }
}