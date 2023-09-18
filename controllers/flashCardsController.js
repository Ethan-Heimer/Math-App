const display = (req, res) => {
    res.render("flashCards", {user: req.session.user});
}

module.exports = {
    display
}
