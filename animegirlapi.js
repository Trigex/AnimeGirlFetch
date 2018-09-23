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

// get body of post request
app.use(bodyParser.urlencoded({extended: true}));

/*
    FUNCTIONS
*/

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    GET /image
    Retrives random image
*/
app.get("/image", function(req, res){
    var images = [];

    fs.readdir("./" + config.directory, (err, files) => {
        files.forEach(file => {
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
