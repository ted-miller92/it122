("use strict");
import express from "express";
import { Band } from "./models/Bands.js";
import cors from 'cors';

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

// Allow cross-origin resource sharing using cors
app.use('/api/', cors());

// Setting routes with Handlebars -----------------------------------------

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
	console.log(`Deleting record for ${req.query.name}`);
	var bandName = req.query.name
	Band.deleteOne({ "name" : req.query.name}).lean()
		.then((bands) => {
			console.log(`Deleted record for ${req.query.name}`);
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

// BEGIN API -----------------------------------------------------

//API For all bands data
app.get("/api/bands", (req, res, next) => {
	console.log("Retrieving API for all bands");
	Band.find({}, (err, bands) => {
		if (err || !bands) {
			res.status(404).json({"Error":`Bands not found`});
			console.log(`Error retreiving details for bands`);
		} else {
			res.json(bands);
			console.log(`Retrieved data for bands`);
		}
	})
})

//API for single band data
app.get('/api/detail', (req, res, next) => {
	Band.findOne({"name" :req.query.name}, (err, band) => {
		if (err || !band) {
			res.status(404).json({"Error":`Details for ${req.query.name} not found`});
			console.log(`Error retrieving details for ${req.query.name}`);
		} else {
			res.json(band);
			console.log(`Retrieved data for ${req.query.name}`);
		}
	})
});

//API for creating an item (POST)
app.post('/api/bands', (req, res) =>{
	const band = new Band({
		name:req.body.name,
		genre:req.body.genre,
		yearFormed:req.body.yearFormed,
		location:req.body.location
	},
	{
		versionKey: false
	});
	Band.create(band, (err, band) => {
		if (err || !band) {
			res.status(404).json({"Error": "Could not create a new Band"});
			console.log("Error: Could not create new band");
		}else{
			res.json(band);
		}
	});
});

//API for deleting an item
app.get('/api/delete', (req, res) => {
	Band.deleteOne({ "name" : req.query.name}, (err, result) => {
		if (err) {
			res.status(404).json({"Error": "Could not delete band"});
			console.log("Error: Could not delete band");
		}else{
			res.json(result.deletedCount);		//return number of deleted items
		}
	})
})

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