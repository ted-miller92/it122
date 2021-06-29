const http = require("http");
http.createServer((req,res) => {
	var path = req.url.toLowerCase();
	switch(path) {
		case '/':
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.end('Home Page');
			break;
		case '/about':
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.write('About Page\n');
			res.write('This is my first node.js page. The second, if you count the Home Page.\n');
			res.end('I started learning web authoring and development in the Summer of 2020, when I found myself with no income and a lot of time on my hands...\nSince then, I\'ve learned HTML, CSS, and some rudimentary Javascript and Python.');
			break;
		default:
			res.writeHead(404, {'Content-Type' : 'text/plain'});
			res.end('Not Found');
			break;
	}
}).listen(process.env.PORT || 3000);
