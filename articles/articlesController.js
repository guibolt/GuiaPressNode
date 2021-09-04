const express = require("express");
const categoryModel = require("../categories/categoryModel");
const router = express.Router();
const articleModel = require("./articleModel");
const slugify = require("slugify");
const app = require("../config/expressConfig");

router.get("/admin/articles", (req, res) => {
  const searchObj = {
    include: [{ model: categoryModel }],
  };
  articleModel.findAll(searchObj).then((articles) => {
    res.render("admin/articles/index", { articles });
  });
});

router.get("/admin/articles/new", (req, res) => {
  categoryModel.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const categoryId = req.body.category;

  const newArticle = {
    title,
    body,
    categoryId,
    slug: slugify(title),
  };

  console.log("a", newArticle);
  articleModel.create(newArticle).then(res.redirect("/admin/articles"));
});

router.post("/articles/delete", (req, res) => {
  const id = req.body.id;
  const redirectUrl = "/admin/articles";

  if (id !== undefined && !isNaN(id)) {
    const condition = {
      where: {
        id,
      },
    };
    articleModel.destroy(condition).then(() => res.redirect(redirectUrl));
  } else {
    res.redirect(redirectUrl);
  }
});

router.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const searchObj = {
    where: {
      slug,
    },
  };
  articleModel
    .findOne(searchObj)
    .then((article) => {
      if (article) res.render("admin/articles/article", { article });
      else res.redirect("/");
    })
    .catch((err) => res.redirect("/"));
});

module.exports = router;
