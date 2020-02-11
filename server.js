var express = require('express');
var app = express();
var fs = require("fs"),
    bodyParser = require("body-parser"),
    moment = require('moment');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var _ = require('underscore');


app.get('/', function (req, res) {
    
    res.send('get successfull');
});



app.post('/fulfillment', function (req, res) {
    console.log(JSON.stringify(req.body));
    var data = controller.profileData;
    console.log(JSON.stringify(data))
    if (req.body.queryResult.action == "WebCheckInIntent") {
        console.log("Inside details intent");
        if (req.body.queryResult.parameters && req.body.queryResult.parameters.PNR) {
        }
    }


})



// var id = 2;

// app.delete('/deleteUser', function (req, res) {
//    // First read existing users.
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       data = JSON.parse( data );
//       delete data["user" + 2];

//       console.log( data );
//       res.end( JSON.stringify(data));
//    });
// })



var server = app.listen(process.env.PORT || 7900, function () {
    console.log("Listening our local server   %s...", server.address().port);
});

