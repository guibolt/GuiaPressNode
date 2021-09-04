const sequelize = require("sequelize");
const connection = require("../database/database");
const categoryModel = require("../categories/categoryModel");

const articleModel = connection.define("articles", {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

categoryModel.hasMany(articleModel);
articleModel.belongsTo(categoryModel);

module.exports = articleModel;
