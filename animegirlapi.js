/* AnimeGirlAPI
 * Licensed under the MIT License
 * (c) 2017 Trigex
 */

 var express    = require("express"),
     app        = express();
     fs         = require("fs");
     bodyParser = require("body-parser");

var config = require("./config.json");

// go to public directory for assets
app.use(express.static("public"));

// set view engine to use ejs
app.set("view engine", "ejs");

// get body of post request
app.use(bodyParser.urlencoded({extended: true}));

/*
    FUNCTIONS
*/

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    API
*/

/*
    GET
    Retrives random image
*/
app.get("/image", function(req, res){
    var images = [];
    var imageCount = 0;

    fs.readdir("./" + config.directory, (err, files) => {
        files.forEach(file => {
            imageCount++;
            images.push(file);
        });

        var image = images[getRandomNumber(0, images.length)];

        res.redirect("/images/" + image);
    });
});

// listen for requests
app.listen(config.port, "127.0.0.1", function(){
    console.log("Started server listening at 127.0.0.1 on port " + config.port);
});
