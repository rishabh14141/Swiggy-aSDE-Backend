const http = require('http');
const { playGame } = require('./controllers/conquer-game.js');

// Define the port to listen on
const port = 3000;


// Create a server object
const server = http.createServer((req, res) => {
    // Parse the URL
    const url = new URL(req.url, `http://localhost:${port}`);
    
    if (url.pathname == '/' || url.pathname == '/swiggy') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Swiggy Conquer Game");
    }
    else if (url.pathname == '/swiggy/play-conquer' && req.method == 'POST') {
        let body = '';
        req.setEncoding('utf8');

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                // Parse the JSON body
                const parsedBody = JSON.parse(body);

                playGame(parsedBody, res);
            } catch (error) {
                // If parsing fails, respond with an error
                console.log(error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request');
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


// Listen for incoming requests on specified port
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});