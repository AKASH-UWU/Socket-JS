const WebSocket = require('ws');

// Use the dynamic PORT from Render's environment or default to 3000 for local dev
const port = process.env.PORT || 10000;  // Default to 10000 if not provided
const wss = new WebSocket.Server({ host: '0.0.0.0', port: port });

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

console.log(`WebSocket server running on ws://0.0.0.0:${port}`);
