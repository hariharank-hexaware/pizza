var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    
    res.send('get successfull');
});



app.post('/fulfillment', function (req, res) {
    
        console.log("request", JSON.stringify(req.body));
       if (req.body.queryResult.intent.displayName == "Default Welcome Intent") {
            console.log("Inside intent", req.body.queryResult.intent);
            console.log("Inside Default Welcome Intent", req.body.queryResult.intent.displayName);
            let response = {
                "fulfillmentText": ``,
                "fulfillmentMessages": [
                    {
                        "card": {
                            "title": `YOYO PIZZA`,
                            "subtitle": `What do you like to have today`,
                            "imageUri": `https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.gettyimages.com%2Fphotos%2Fcloseup-of-pizza-on-table-picture-id995467932%3Fs%3D612x612&imgrefurl=https%3A%2F%2Fwww.gettyimages.in%2Fphotos%2Fpizza&tbnid=O_obr5MGDOO-sM&vet=12ahUKEwjo1rmOzMznAhV71nMBHTtsDrwQMygQegUIARCkAg..i&docid=36wDU858X8BMQM&w=612&h=408&q=pizza%20images&safe=active&ved=2ahUKEwjo1rmOzMznAhV71nMBHTtsDrwQMygQegUIARCkAg`,
                            "buttons": [
                                {
                                    "text": "Login",
                                    "postback": "User Details"
                                }
                            ]
                        }
                    }
                ]

            };
            console.log("B4 send");
            res.json(response);    
        

       }
})




var server = app.listen(process.env.PORT || 7900, function () {
    console.log("Listening our local server   %s...", server.address().port);
});

