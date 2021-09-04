const express = require("express");
const router = express.Router();
const categoryModel = require("./categoryModel");
const slugfy = require("slugify");

router.get("/admin/categories/new", (req, res) =>
  res.render("admin/categories/new")
);

router.post("/categories/save", (req, res) => {
  let title = req.body.title;
  console.log(title);

  if (title) {
    let obj = {
      title,
      slug: slugfy(title),
    };
    categoryModel.create(obj).then(() => {
      res.redirect("/admin/categories");
    });
  } else res.redirect("/admin/categories/new");
});

router.get("/admin/categories", (req, res) =>
  categoryModel
    .findAll()
    .then((categories) => res.render("admin/categories/index", { categories }))
);

router.post("/categories/delete", (req, res) => {
  const id = req.body.id;
  const redirectUrl = "/admin/categories";

  if (id !== undefined && !isNaN(id)) {
    const condition = {
      where: {
        id,
      },
    };
    categoryModel.destroy(condition).then(() => res.redirect(redirectUrl));
  } else {
    res.redirect(redirectUrl);
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  const id = req.params.id;
  let redirectUrl = "/admin/categories";

  if (isNaN(id)) {
    res.redirect(redirectUrl);
  }

  categoryModel
    .findByPk(id)
    .then((category) => {
      if (category) {
        res.render("admin/categories/edit", { category });
      } else {
        res.redirect(redirectUrl);
      }
    })
    .catch((err) => res.redirect(redirectUrl));
});

router.post("/categories/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const condition = {
    id,
  };

  const updateObj = {
    title,
    slug: slugfy(title),
  };

  categoryModel
    .update(updateObj, {
      where: condition,
    })
    .then(() => {
      res.redirect("/admin/categories");
    });
});

module.exports = router;
