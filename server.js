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
    console.log("Example app listening at http://localhost", host, port);
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

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var sql =
        "SELECT * FROM login_food.user WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result.length > 0) {
            if (res) {
                // console.log("success");
                res.send({
                    message: "success",
                    username: req.body.username,
                    password: req.body.password,
                });
            } else {
                res.send({ message: "Wrong password" });
            }
        } else {
            res.send({ message: "Wrong username" });
        }
    });
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    var sql = "INSERT INTO login_food.user (username, password) VALUES (?,?)";
    db.query(sql, [username, password], (err) => {
        if (err) throw err;
        console.log(result);
        if (result)
            res.send({
                message: "success",
                username: req.body.username,
                password: req.body.password,
            });
        else {
            res.send({ message: "Wrong username" });
        }
    });
});

app.get("/datasanpham", (req, res) => {
    var sql = "SELECT * FROM login_food.sanpham";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/datakhuyenmai", (req, res) => {
    var sql = "SELECT * FROM login_food.khuyenmai";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/dataorder", (req, res) => {
    var sql = "SELECT * FROM login_food.order";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/dataorderhistory", (req, res) => {
    var sql = "SELECT * FROM login_food.orderhistory";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/datactsp", (req, res) => {
    var sql = "SELECT * FROM login_food.ctsp";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
