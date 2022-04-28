const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const { application } = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_food",
});
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/data", (req, res) => {
    var sql = "SELECT * FROM login_food.user";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.post("/data", (req, res) => {
    var sql =
        "INSERT INTO login_food.user (username, password) VALUES ('" +
        req.body.username +
        "','" +
        req.body.password +
        "')";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({
            message: "success",
            username: req.body.username,
            password: req.body.password,
        });
    });
});
