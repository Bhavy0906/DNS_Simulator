var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'dns',
    user: 'root',
    password: 'Bhavy@goel17'
})

module.exports = connection;