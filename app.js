const express = require('express');
const app = express();
const fs = require('fs');
const http = require("http");
const { dirname } = require('path');
const { resourceUsage } = require('process');
const { stringify } = require('querystring');
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));
app.use("/data", express.static("data"), function(req, res) {
    // Optional 404 handler
    res.status(404);
    res.json({ error: { code: 404 } });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/guestbook', function (req, res) {
    res.sendFile(__dirname + "/public/guestbook.html")
});

app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + "/public/newmessage.html")
});

app.get('/ajaxmessage', function (req, res) {
    res.sendFile(__dirname + "/public/ajaxmessage.html")
});

app.get("*", function(req, res) {
    res.send("Cant find the requested page", 404);
});

let data = require(__dirname + "/public/data/data.json");

app.post("/update", function(req, res) {
    // Check if the form fields are empty
    if (!req.body.name || !req.body.country || !req.body.message) {
        return res.status(400).send("All fields are required");
    }

    // Load data from JSON file
    let data = require(__dirname + "/public/data/data.json");

    let date = new Date().toUTCString();

    let entry = {
        "id": data.length + 1,
        "username": req.body.name,
        "country": req.body.country,
        "date": date,
        "message": req.body.message
    };

    data.push(entry);

    // Write updated data back to JSON file
    fs.writeFile(__dirname + "/public/data/data.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log("An error occurred while writing JSON Object to File.");
            return res.status(500).json({ error: 'Failed to add new entry.' });
        }
        console.log("JSON file has been saved.");
        res.redirect('/guestbook'); // Redirect to the guestbook page after adding the entry
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

