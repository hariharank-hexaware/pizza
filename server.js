var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    
    res.send('get successfull');
});


var selected_pizza;


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
        selected_pizza = req.body.queryResult.parameters.SelectedPizza;
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
    } else if (req.body.queryResult.intent.displayName == "Order_Pizza_NonVeg") {
        selected_pizza = req.body.queryResult.parameters.SelectedPizza;
        let response = {
         "fulfillmentText": ``,
         "fulfillmentMessages": [
             {
                 "quickReplies": {
                     "title": "Select your Pizza",
                     "quickReplies": [
                         "Chicken Fried",
                         "Chicken barbecue",
                         "Chicken Roasted"
                     ]
                 },
                 "platform": "FACEBOOK"
             }
         ]
     };
     console.log("B4 send");
     res.json(response);
    } else if (req.body.queryResult.intent.displayName == "Order_Pizza_Both") {
        selected_pizza = req.body.queryResult.parameters.SelectedPizza;
        let response = {
         "fulfillmentText": ``,
         "fulfillmentMessages": [
             {
                 "quickReplies": {
                     "title": "Select your Pizza",
                     "quickReplies": [
                         "Chicken Fried",
                         "Chicken barbecue",
                         "Chicken Roasted",
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
    } else if (req.body.queryResult.intent.displayName == "Order_Pizza_Veg_Type" || req.body.queryResult.intent.displayName == "Order_Pizza_NonVeg_Type" || req.body.queryResult.intent.displayName == "Order_Pizza_Both_Type") {
        selected_pizza = req.body.queryResult.parameters.SelectedPizza;
        let response = {
            "fulfillmentText": ``,
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": `${selected_pizza}`,
                        "subtitle": `Added to Cart`,
                        "imageUri": `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeN9ZmxOgfpz2fNKoay9gqh5sgKCkpSzbjEYbNuby5dhnJV-_C`,
                        "buttons": [
                            {
                                "text": "Place Order",
                                "postback": "Place Order"
                            }
                        ]
                    }
                }
            ]
        };
        console.log("B4 send");
        res.json(response);  
    } else if (req.body.queryResult.intent.displayName == "Order_Pizza_Veg_Size_Cart"  ||req.body.queryResult.intent.displayName == "Order_Pizza_NonVeg_Size_Cart" ||req.body.queryResult.intent.displayName == "Order_Pizza_Both_Size_Cart"   ) {
        let response = {
            "fulfillmentText": ``,
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": `Order ID`,
                        "subtitle": `123221`,
                        "imageUri": `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHbeI27sgDsg8UBdsU5zM8_Fml1PYrQ2Mnz0QUtapMMZKIa29c`,
                        "buttons": [
                            {
                                "text": "Check Order status",
                                "postback": "Order Status"
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

