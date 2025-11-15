import { WebSocketServer } from 'ws';

const wssOptions = { port: 3000 };
const wss = new WebSocketServer(wssOptions);

console.log(`Start ws server on the ${wssOptions.port} port!`);
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});