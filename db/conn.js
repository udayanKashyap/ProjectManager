const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "",
    database: "project_management",
  })
  .promise();

module.exports = pool;
