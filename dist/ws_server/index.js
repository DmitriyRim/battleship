import { WebSocketServer } from 'ws';
var wssOptions = { port: 3000 };
var wss = new WebSocketServer(wssOptions);
console.log("Start ws server on the ".concat(wssOptions.port, " port!"));
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
});
