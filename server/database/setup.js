const fs = require('fs');
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync('./database/diary_table.sql').toString();

db.query(sql)
    .then(data => console.log("Set-up complete."))
    .catch(error => console.log(error));