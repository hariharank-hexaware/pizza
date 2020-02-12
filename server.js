var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var _ = require('underscore');


'use strict';

const request = require("request");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    
    res.send('get successfull');
});


var selected_pizza, order_id, user_number, user_name, address, status, order_id1;
var objData = {
    u_order_item : selected_pizza,
    u_status : "Food is being prepared",
    u_user_number : user_number
}


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
        user_name = req.body.queryResult.parameters.UserName;
        user_number = req.body.queryResult.parameters.MobileNumber;
        address = req.body.queryResult.parameters.Address;
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
        sendDetails();
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
                        "title": `Your order has been placed successfully.`,
                        "subtitle": `Order ID - ${order_id}`,
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
    }  else if (req.body.queryResult.intent.displayName == "Order_Enquiry") {
        order_id1 = req.body.queryResult.parameters.OrderId;
        getDetails();
        let response = {
            "fulfillmentText": ``,
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": `${status}`,
                        "subtitle": `Order ID - ${order_id}`,
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
function getDetails() {
    console.log("Inside getDetails");
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: 'https://' + process.env.instance + '/api/now/table/u_pizza_order',
            headers:
            {
                'Accept': 'application/json'
            },
            auth: {
                'user': process.env.username,
                'password': process.env.password
            }
        };


        console.log(options);
        request(options, (error, response, body) => {
            console.log("After API Call result");
            if (error) {
                console.log("Error in API", error);
                return reject('I am unable to find the article now. Please try again later');
            } else if (response.statusCode == 200) {
                let data = JSON.parse(body);

                // console.log("data.result.text",data.result[0].text);
                // let parsedata = JSON.stringify(data.result[0].text);
                // const dom = new JSDOM(parsedata);
                // console.log("parsed data",dom.window.document.querySelector("p")); 


                console.log('data.result', data.result);
                console.log("Waiting for API");
                if (data.result.length > 0) {
                    var filteredObj = _.where(data.result, { "u_number": order_id1});

                    status = filteredObj[0].u_status;
                    return resolve(data.result);
                    
                    
                } else {
                    status = "Sorry I am not able to find it.";
                    return resolve("Sorry I am not able to find it.");
                }
            }
            

            else {
                console.log("No service");
                return resolve(`Service currently unavailable`);
            }
            
        });
    });
}

function sendDetails() {
    console.log("Inside sendDetails");
    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: 'https://' + process.env.instance + '/api/now/table/u_pizza_order',
            headers:
            {
                'Accept': 'application/json',
            },
             body: objData,
            json: true,
            auth: {
                'user': process.env.username,
                'password': process.env.password
            }
        };


        console.log(options);
        request(options, (error, response, body) => {
            console.log("After API Call result");
            console.log("response",typeof(response.statusCode));
            console.log("body",body);
            if (error) {
                console.log("Error in API", error);
                return reject('I am unable to place the order. Please try again later');
            } else {
                let data = body;
                console.log("data find", data);
                console.log('result_resultnumber', data.result.u_number);
                console.log("Waiting for API");
                order_id = data.result.u_number 
                    return resolve(data.result.u_number);
                
            } 
            
        });
    });
}



var server = app.listen(process.env.PORT || 7900, function () {
    console.log("Listening our local server   %s...", server.address().port);
});

