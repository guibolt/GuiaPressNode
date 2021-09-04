const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const categoriesController = require("../categories/categoriesController");
const articlesController = require("../articles/articlesController");

const articlesModel = require("../articles/articleModel");

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  const serachOptions = {
    order: [["id", "DESC"]],
  };
  articlesModel.findAll(serachOptions).then((articles) => {
    const locale = "pt-br";
    const otherArticles = articles.map((article) => {
      return {
        title: article.title,
        slug: article.slug,
        body: article.body,
        createdAt: retornaDataFormatada(
          article.createdAt.toLocaleDateString(locale)
        ),
      };
    });

    res.render("index", { articles: otherArticles });
  });
});

const retornaDataFormatada = (data) => {
  const dataSeparada = data.split("-");
  return `Data de criação: ${dataSeparada[2]}/${dataSeparada[1]}/${dataSeparada[0]}`;
};
module.exports = app;
