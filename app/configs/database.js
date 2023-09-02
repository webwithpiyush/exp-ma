const mysql = require("mysql");
require('dotenv').config()

// Create a connection to the database
const host = process.env.DB_HOST || "localhost";
const database = process.env.DB_NAME || "exp_ma";
const user = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "";

const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;