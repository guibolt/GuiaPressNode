const sequelize = require("sequelize");
const connection = require("../database/database");

const categoryModel = connection.define("categories", {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = categoryModel;
