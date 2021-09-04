const conn = require("./database/database");
const app = require("./config/expressConfig");

const articleModel = require('./articles/articleModel')
const categoryModel = require('./categories/categoryModel')

conn
  .authenticate()
  .then(() => console.log("foi boi"))
  .catch((err) => console.log(err));

app.listen(4200, () => console.log("foi amigo"));
