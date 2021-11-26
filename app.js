const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose.connect("mongodb://localhost/blog");


const articleRouter = require("./routes/articles");

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use("/articles", articleRouter)

app.get("/", (req, res) => {
    const articles = [{
        title: "text Article",
        createdAt: new Date(),
        description: "text description"
    }]
    res.render("index", {articles})
})

app.listen(5000);