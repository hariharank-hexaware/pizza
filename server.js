var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

