const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const noteRoute = require('./routes/NoteRoutes.js');

app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 3
}));
app.use("/notes", noteRoute);
app.use(express.static("./public/css"));
app.use(express.static("./public/images"));
app.use(express.static("./public/js"));

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(3000, () => {
    console.log("server!!");
})

