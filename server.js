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
                            "imageUri": `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeN9ZmxOgfpz2fNKoay9gqh5sgKCkpSzbjEYbNuby5dhnJV-_C`,
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
       } else if (req.body.queryResult.intent.displayName == "User_Details") {
           let response = {
            "fulfillmentText": ``,
            "fulfillmentMessages": [
                {
                    "quickReplies": {
                        "title": "Login Successfull.",
                        "quickReplies": [
                            "Tap to order Pizza."
                        ]
                    },
                    "platform": "FACEBOOK"
                }
            ]
        };
        console.log("B4 send");
        res.json(response);
       } else if (req.body.queryResult.intent.displayName == "Order_Pizza") {
        let response = {
         "fulfillmentText": ``,
         "fulfillmentMessages": [
             {
                 "quickReplies": {
                     "title": "Select your type",
                     "quickReplies": [
                         "Veg",
                         "Non-Veg",
                         "Both"
                     ]
                 },
                 "platform": "FACEBOOK"
             }
         ]
     };
     console.log("B4 send");
     res.json(response);
    } else if (req.body.queryResult.intent.displayName == "Order_Pizza_Veg") {
        let response = {
         "fulfillmentText": ``,
         "fulfillmentMessages": [
             {
                 "quickReplies": {
                     "title": "Select your Pizza",
                     "quickReplies": [
                         "Veg Maharaja",
                         "Paneer Pizza",
                         "Golden Corn"
                     ]
                 },
                 "platform": "FACEBOOK"
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

