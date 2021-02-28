var fs = require("fs")

module.exports = function (app) {

    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON 
    app.get("/api/notes", function (req, res) {
        //res.sendFile(path.join(__dirname, "db.json"))
        fs.readFile("./db/db.json", 'utf8', function (error, notes) {
            if (error) {
                throw error
            } else {
                let data = JSON.parse(notes)
                notesObj = [].concat(data)
                res.json(notesObj)
            }
        })
    })

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
    // and then return the new note to the client.
    app.post("/api/notes", function (req, res) {

        var newNote = req.body;
        fs.readFile("./db/db.json", "utf8", function (error, notes) {
            if (error) {
                throw error
            } else {
                newNote.id = notes.length + 1
                let data = JSON.parse(notes)
                notesObj = [].concat(data)
                notesObj.push(newNote)
                fs.writeFile("./db/db.json", JSON.stringify(notesObj), function (error) {
                    if (error) {
                        throw error
                    } else {
                        res.json(newNote)
                    }
                })
            }
        })
    })

    app.delete("/api/notes:id", function (req, res) {
        var noteToDelete = req.params.id;

    })
}