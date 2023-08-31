const express = require("express");
const app = express();

const testRoute = require('./routes/TestRoutes.js');

app.use("/users", testRoute);

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(3000, () => {
    console.log("server!!");
})

