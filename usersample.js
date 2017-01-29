var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
	fs.readFile("C://Workspace//nodejs_selflearn//usersample.json", function(err, data) {
		console.log(data);
		res.end(data);
	});
})

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Sample App listening at http://%s:%s", host, port);
})