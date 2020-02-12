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
        console.log("request", JSON.stringify(req.body));
        if (req.body.intent.displayName) {
            console.log("Inside Default Welcome Intent");
            let response = {
                
                    "payload": {
                      "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                          "items": [
                            {
                              "simpleResponse": {
                                "textToSpeech": "Here's an example of a basic card."
                              }
                            },
                            {
                              "basicCard": {
                                "title": "Yoyo Pizza",
                                "subtitle": "What do you like to have today",
                                "formattedText": "Order Veg and Non-veg pizza anytime",
                                "image": {
                                  "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgBsJd8BklBVRMKQU7TYJkHvM46i8wmTct3Wy8oGPpcISsZkpp",
                                  "accessibilityText": "Yoyo Pizza"
                                },
                                "buttons": [
                                  {
                                    "title": "Login",
                                    "openUrlAction": {
                                      "url": "Login"
                                    }
                                  }
                                ],
                                "imageDisplayOptions": "CROPPED"
                              }
                            },
                            {
                              "simpleResponse": {
                                "textToSpeech": "Here is Yoyo Pizza"
                              }
                            }
                          ]
                        }
                      }
                    }

                }
            }
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

