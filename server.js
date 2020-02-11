var express = require('express');
var app = express();


app.get('/', function (req, res) {
    
    res.send('get successfull');
});



app.post('/fulfillment', function (req, res) {
    console.log(JSON.stringify(req.body));
    var data = controller.profileData;
    console.log(JSON.stringify(data))
    if (req.body.queryResult.action == "DefaultWelcomeIntent") {
        console.log("Inside details intent");
        
    }


})




var server = app.listen(process.env.PORT || 7900, function () {
    console.log("Listening our local server   %s...", server.address().port);
});

