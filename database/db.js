// Connect to DB
const mysql = require("mysql");

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

database.connect((error) => {
  if (error) {
    console.log("Hubo un error en la conexión de la base de datos: " + error);
    return;
  } else {
    console.log("La conexión a la base de datos ha sido exitosa!");
  }
});

module.exports = database;
