const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('[+] New client connected');
  ws.send('Welcome to the WebSocket server!');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
