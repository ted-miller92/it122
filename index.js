import http from "http";
import fs from "fs";
import * as bands from "./data.js";
import { parse } from "querystring";
("use strict");
import express from "express";
import { Band } from "./models/Bands.js";

var app = express();

// listen on default or port 3000
app.set("port", process.env.PORT || 3000);

//Set location for static files
app.use(express.static("./public"));

//Setting up handlebars view engine
import exphbs from "express-handlebars";
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main",
		extname: ".handlebars",
	})
);

app.set("view engine", "handlebars");

//parse url-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Setting routes with Handlebars

// Home page GET with MongoDB
app.get("/", (req, res, next) => {
	console.log(`Retrieving band data from SCCDB...`);
	Band.find({}).lean()
		.then((bands) => {
			console.log("Retrieved data from SCCDB");
			// return bands;
			res.render("home", { bands });
		})
		.catch((err) => next(err));
});

// Detail GET with MongoDB
app.get("/detail", (req, res, next) => {
	console.log(`Retrieving data for ${req.query.name} from SCCDB...`);
	Band.findOne({"name" :req.query.name}).lean()
		.then((bands) => {
			console.log(`Retrieved data for ${req.query.name} from SCCDB`);
			res.render("detail", { bands } );
		})
		.catch((err) => next(err));
});
// Delete record/document from SCCDB
app.get("/delete", (req, res, next) => {
	console.log(`Deleting record for {$req.query.name}`);
	var bandName = req.query.name
	Band.deleteOne({ "name" : req.query.name}).lean()
		.then((bands) => {
			console.log(`Found record for ${req.query.name}`);
			res.render("deleted", {bandName});
		})
		.catch((err) => next(err));
	console.log(`Retrieving band data from SCCDB...`);
	Band.find({}).lean()
		.then((bands) => {
			console.log("Retrieved data from SCCDB");
			// return bands;
		})
		.catch((err) => next(err));
});

// Previous GET method before connecting to MongoDB
// app.get("/detail", (req, res) => {
// 	let result = bands.getItem(req.query.name);
// 	res.render("detail", { name: req.query.name, result: result });
// });

app.get("/about", (req, res) => {
	res.type("text/plain");
	res.send(
		"About Page\nThis is my first node.js page. The second, if you count the Home Page.\nI started learning web authoring and development in the Summer of 2020, when I found myself with no income and a lot of time on my hands...\nSince then, I've learned HTML, CSS, and some rudimentary Javascript and Python."
	);
});

app.use((req, res) => {
	res.type("text/plain");
	res.status(404);
	res.send("404 - Not Found");
});

app.listen(app.get("port"), () => {
	console.log(`Express App Started on port ${app.get("port")}`);
});

// Strictly Node from here to end --------------------
// http.createServer((req,res) => {

// 	let url = req.url.split("?");  // separate route from query string
// 	let query = parse(url[1]); // convert query string to a JS object
// 	console.log(query.name);

// 	let path = url[0].toLowerCase();

// 	switch(path) {
// 		case '/':
// 			res.writeHead(200, {'Content-Type' : 'text/plain'});
// 			res.end(JSON.stringify(bands.getAll()));
// 			break;
// 		case '/about':
// 			res.writeHead(200, {'Content-Type' : 'text/plain'});
// 			res.write('About Page\n');
// 			res.write('This is my first node.js page. The second, if you count the Home Page.\n');
// 			res.end('I started learning web authoring and development in the Summer of 2020, when I found myself with no income and a lot of time on my hands...\nSince then, I\'ve learned HTML, CSS, and some rudimentary Javascript and Python.');
// 			break;
// 		case '/detail':
// 			let bandName = bands.getItem(query.name);

// 			let results;
// 			if (bandName){
// 				results = JSON.stringify(bandName);
// 			} else {
// 				results = "Does Not Exist";
// 			}
// 			res.writeHead(200, {'Content-Type' : 'text/plain'});
// 			res.end(results);
// 			break;
// 		default:
// 			res.writeHead(404, {'Content-Type' : 'text/plain'});
// 			res.end('Not Found');
// 			break;
// 	}
// }).listen(process.env.PORT || 3000);
