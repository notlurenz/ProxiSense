// Import http library
const http = require('http');

// Use env variable to define TCP/IP port with a default
const PORT = process.env.PORT || 8080;

// Create our server object
const server = http.createServer((request, response) => {
    const { method, url } = request;

    // Set a default response header
    response.setHeader('Content-Type', 'application/json');

    // Define API routes
    if (method === 'GET' && url === '/') {
        response.statusCode = 200;
        response.write(JSON.stringify({ message: 'Welcome to the API!' }));
        response.end();
    } else if(method === 'GET' && url === '/weather'){
			fetch('https://api.weatherapi.com/v1/current.json?key=99755e46731a4b1b81730018242109&q=14.5625961%2C120.9993082')
			.then (response=> response.json())
			.then (data=> {
				response.statusCode = 200;
        response.write(JSON.stringify({ message: data }));
        response.end();

			})
    } else {
        // Handle 404 for unknown routes
        response.statusCode = 404;
        response.write(JSON.stringify({ message: 'Endpoint not found' }));
        response.end();
    }
});

// Get the server to start listening
server.listen(PORT, (err) => {
    // Error checking
    err ? console.error(err) : console.log(`listening on port ${PORT}`);
});