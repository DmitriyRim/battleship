import { WebSocketServer } from 'ws';
import { parseStringToJson } from '../utils/utils.js';

const wssOptions = { port: 3000 };
const wss = new WebSocketServer(wssOptions);

console.log(`Start ws server on the ${wssOptions.port} port!`);
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(requestData) {
    const requestJson = parseStringToJson(requestData.toString());
 
    console.log('received (<-):', requestJson);
  });

  ws.send('something');
});
