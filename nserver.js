/*jslint node: true*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

// Use Body Parser to Parse JSON body
app.use(bodyParser.json());

var connArgs = {
		"user": "system",
		"password": "system",
		"connectString": "localhost/ezopsdb"
}

// Http Method: GET
// URI: /user_profiles
// Read all User Properties
app.get('/user_profiles', function (req, res) {
	"use strict";
	
	oracledb.getConnection(connArgs, function (err, conn) {
		if (err) {
			// Error connecting to db
			res.set('Content-Type', 'application/jason');
			res.status(500).send(JSON.stringify({
				status: 500,
				message: "Error connecting to DB",
				detailed_message: err.message
			}));
			return;
		}
		
		conn.execute("SELECT * FROM USER_PROFILES", {}, {
			outFormat:oracledb.OBJECT
		}, function (err, result) {
			if (err) {
				res.set('Content-Type', 'application/json');
				res.status(500).send(JSON.stringify({
					status: 500,
					message: "Error getting User Profile",
					detailed_message: err.message
				}));				
			} else {
				res.contentType('application/json').status(200);
				res.send(JSON.stringify(result.rows));				
			}
			// Release the connection
			conn.release(
				function (err) {
					if (err) {
						console.error(err.message);
					} else {
						console.log("GET /user_profiles/" + req.params.USER_NAME + "Connection Released");
					}
				});
		});
	});	
});







