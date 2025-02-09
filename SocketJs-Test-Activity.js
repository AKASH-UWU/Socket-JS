const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3003 });

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
    //activity = ''; // Reset activity when the client disconnects
    //console.log('Activity reset to empty');
  });
});

console.log('WebSocket server running on ws://localhost:3003');
