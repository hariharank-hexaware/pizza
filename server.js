var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    
    res.send('get successfull');
});



app.post('/fulfillment', function (req, res) {
    try{
        console.log("request", req);
    }
    catch(exception){
        console.log("exception",exception);
    }
    //console.log(JSON.stringify(req.body));
    // if (req.body.queryResult.action == "DefaultWelcomeIntent") {
    //     console.log("Inside details intent");
        
    // }


})




var server = app.listen(process.env.PORT || 7900, function () {
    console.log("Listening our local server   %s...", server.address().port);
});

