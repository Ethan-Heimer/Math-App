const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

const noteRoute = require('./routes/noteRoutes.js');
const editorRoute = require('./routes/editorRoutes.js');
const loginRoute = require('./routes/userRoutes.js');
const flashcardRoute = require('./routes/flashCardRoutes.js');

app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 5
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use("/notes", noteRoute);
app.use("/editor", editorRoute);
app.use('/user', loginRoute);
app.use('/flashcard', flashcardRoute);

app.use(express.static("./public/css"));
app.use(express.static("./public/images"));
app.use(express.static("./public/js"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/" , (req, res) => {
    res.redirect("/user/login");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server!!");
})

