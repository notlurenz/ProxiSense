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
    } else if (method === 'GET' && url === '/users') {
        // Example endpoint: GET /users
        const users = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 }
        ];
        response.statusCode = 200;
        response.write(JSON.stringify(users));
        response.end();
    } else if (method === 'POST' && url === '/add-user') {
        // Example endpoint: POST /add-user
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const newUser = JSON.parse(body);
            response.statusCode = 201;
            response.write(JSON.stringify({ message: 'User added', user: newUser }));
            response.end();
        });
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