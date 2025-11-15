import { WebSocketServer } from 'ws';
import { parseStringToJson } from '../utils/utils.js';
import { Operation } from '../types/index.js';
import {
  createRoom,
  createUser,
  updateRoom,
  updateWinners,
} from '../api/index.js';
import { clients } from '../db/index.js';
import crypto from 'node:crypto';

const wssOptions = { port: 3000 };
const wss = new WebSocketServer(wssOptions);

console.log(`Start ws server on the ${wssOptions.port} port!`);
wss.on('connection', function connection(ws) {
  clients.set(ws, crypto.randomUUID());
  ws.on('error', console.error);

  ws.on('message', function message(requestData) {
    const requestJson = parseStringToJson(requestData.toString());
    const { type, data } = requestJson;

    switch (type) {
      case Operation.REG:
        createUser(ws, data);
        updateRoom(ws);
        updateWinners(ws);
        break;
      case Operation.CREATE_ROOM:
        createRoom(ws);
        updateRoom(ws);
        break;
      default:
        break;
    }
  });
});
