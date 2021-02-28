var express = require("express");
var path = require("path");
var app = express();
var fs = rquire("fs")
var PORT = process.env.PORT || 3000;

var notes = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.json(path.join(__dirname, "public/index.html"))
})

app.get("/notes", function (req, res) {
    // fs.readFile("./db/db.json", (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     res.json(data)
    // })
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/api/notes", function (req, res) {
    //res.sendFile(path.join(__dirname, "db.json"))
    return res.json("db/db.json")
})

app.post("api/notes", function (req, res) {
    fs.appendFile("./db/db.json")
    // var newNote = req.body;
    // res.json(newNote)
})

app.delete("")

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})