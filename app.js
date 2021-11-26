const express = require("express");
const methodOverride = require("method-override");
const Article = require("./models/articles");

const app = express();

require("dotenv").config();
require("./db/connectDB");

const articleRouter = require("./routes/articles");

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")
app.use(methodOverride("_method"));
app.use("/articles", articleRouter)

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: "desc",
    });
    res.render("index", {articles})
})

app.listen(5000);