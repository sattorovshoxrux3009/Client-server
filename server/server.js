const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client ulandi!');

  ws.on('message', (message) => {
    console.log('Kelgan xabar:', message.toString());
    ws.send(message);
  });

  ws.on('close', () => {
    console.log('Klient uzildi');
  });
});

console.log('Websocket server localhost:8080 portida ishlamoqda');
