import { WebSocket } from 'ws';
import { clients, rooms, users, winners } from '../db';
import {
  ResponseReg,
  RequestReg,
  Operation,
  ResponseUpdateRoom,
  ResponseUpdateWinners,
} from '../types';
import { parseJsonToString } from '../utils/utils';
import crypto from 'node:crypto';

export function createUser(ws: WebSocket, data: RequestReg) {
  const { name, password } = data;
  const id = clients.get(ws);
  const answerData = {
    name,
    index: id ?? '',
    error: !id,
    errorText: id ? '' : 'User not found',
  };

  if (id) {
    users.set(ws, { name, password, index: id });
  }

  ws.send(parseJsonToString<ResponseReg>(Operation.REG, answerData));
}

export function updateRoom(ws: WebSocket) {
  ws.send(parseJsonToString<ResponseUpdateRoom>(Operation.UPDATE_ROOM, rooms));
}

export function updateWinners(ws: WebSocket) {
  ws.send(
    parseJsonToString<ResponseUpdateWinners>(Operation.UPDATE_WINNERS, winners),
  );
}

export function createRoom(ws: WebSocket) {
  const roomId = crypto.randomUUID();
  const user = users.get(ws);

  if (user) {
    rooms.push({
      roomId,
      roomUsers: [
        {
          name: user.name,
          index: user.index,
        },
      ],
    });
  }
}

/*
export type Room = {
  roomId: number | string;
  roomUsers: [
    {
      name: string;
      index: number | string;
    },
  ];
};
*/
