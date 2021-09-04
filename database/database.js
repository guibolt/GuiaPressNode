const sequelize = require("sequelize");

const conn = new sequelize("guiapress", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00"
});

module.exports = conn;
