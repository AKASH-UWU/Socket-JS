const WebSocket = require('ws');
const http = require('http');

// Use the dynamic port from Render or default to 10000 for local development
const port = process.env.PORT || 10000;

// Create a basic HTTP server for Render to detect
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Set up WebSocket server to use the same port
const wss = new WebSocket.Server({ server });

let activity = ''; // Initialize the activity as an empty string

wss.on('connection', (ws) => {
  console.log('[+] New client connected');

  // Send the current activity value every 5 seconds
  setInterval(() => {
    ws.send(JSON.stringify({ activity }));
  }, 5000);

  ws.on('message', (message) => {
    console.log('Received:', message);

    // Update the activity with whatever message is received
    activity = message;
    console.log('Activity updated to:', activity);
  });

  ws.on('close', () => {
    console.log('[-] Client disconnected');
    //activity = ''; // Optionally reset activity when client disconnects
  });
});

// Start the HTTP server which binds to the port
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
