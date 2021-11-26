const Router = require("express").Router();
const Article = require("./../models/articles")

Router.get("/new", (req, res) => {
    res.render("articles/new")
});

Router.get("/:id", (req, res) => {

})

Router.post("/", async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try{
        const ARTICLE = await article.save();
        res.redirect(`/articles/${ARTICLE.id}`)
    } catch(err){
        res.render("articles/new", {article})
        console.log(error)
    }
})

module.exports = Router;
