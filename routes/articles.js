const Router = require("express").Router();
const Article = require("./../models/articles")

Router.get("/new", (req, res) => {
    res.render("articles/new", {article: new Article()})
});

Router.get("/edit/:id", async (req, res) => {
    const article =  await Article.findById(req.params.id);
    res.render("articles/edit", {article: article})
});

Router.get("/:slug", async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect("/");
    else res.render("articles/show", {article: article})
})

Router.post("/", async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect("new"))

Router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    console.log()
    next();
}, saveArticleAndRedirect("edit"))

Router.delete("/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try{
            const ARTICLE = await article.save();
            res.redirect(`/articles/${ARTICLE.slug}`)
        } catch(err){
            res.render(`articles/${path}`, {article})
            console.log(err)
        }
    }
}

module.exports = Router;
