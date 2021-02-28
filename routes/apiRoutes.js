const { json } = require("express")
var fs = require("fs")

module.exports = function (app) {

    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON 
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", 'utf8', function (error, notes) {
            if (error) {
                throw error;
            } else {
                let data = JSON.parse(notes);
                notesData = [].concat(data);
                res.json(notesData);
            };
        });
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
    // and then return the new note to the client.
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        fs.readFile("./db/db.json", "utf8", function (error, notes) {
            if (error) {
                throw error;
            } else {
                newNote.id = Date.now();
                let data = JSON.parse(notes);
                notesData = [].concat(data);
                notesData.push(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(notesData), function (error) {
                    if (error) {
                        throw error;
                    } else {
                        res.json(newNote);
                    };
                });
            };
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        var noteToDelete = parseInt(req.params.id);
        fs.readFile("./db/db.json", "utf8", function (error, notes) {
            if (error) {
                throw error;
            } else {
                var notesData = [].concat(JSON.parse(notes));
                var updatedNotesData = [];
                updatedNotesData = notesData.filter((item) => item.id !== noteToDelete);
                fs.writeFile("./db/db.json", JSON.stringify(updatedNotesData), function (error) {
                    if (error) {
                        throw error;
                    } else {
                        res.send("success");
                    };
                });
            };
        });
    });
};