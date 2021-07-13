// const http = require("http");
import http from 'http';
import fs from 'fs';
import * as bands from './data.js'
import { parse } from "querystring"


http.createServer((req,res) => {
	

	let url = req.url.split("?");  // separate route from query string
	let query = parse(url[1]); // convert query string to a JS object
	console.log(query.name);

	let path = url[0].toLowerCase();

	switch(path) {
		case '/':
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.end(JSON.stringify(bands));
			break;
		case '/about':
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.write('About Page\n');
			res.write('This is my first node.js page. The second, if you count the Home Page.\n');
			res.end('I started learning web authoring and development in the Summer of 2020, when I found myself with no income and a lot of time on my hands...\nSince then, I\'ve learned HTML, CSS, and some rudimentary Javascript and Python.');
			break;
		case '/detail':
			let bandName = bands.getItem(query.name);
			
			let results;
			if (bandName){
				results = JSON.stringify(bandName);
			} else {
				results = "Does Not Exist";
			}
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.end(results);
			break;
		default:
			res.writeHead(404, {'Content-Type' : 'text/plain'});
			res.end('Not Found');
			break;
	}
}).listen(process.env.PORT || 3000);