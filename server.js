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
                            "imageUri": `https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1565299624946-b28f40a0ae38%3Fixlib%3Drb-1.2.1%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fimages%2Ffood%2Fpizza&tbnid=rL7bWgaqzpu-1M&vet=12ahUKEwjHybDqzsznAhW_iEsFHSUoB7sQMygBegUIARCFAg..i&docid=rPoPHMiEf84VrM&w=1000&h=1208&q=pizza%20images&safe=active&ved=2ahUKEwjHybDqzsznAhW_iEsFHSUoB7sQMygBegUIARCFAg`,
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

