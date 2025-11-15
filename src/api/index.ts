import { WebSocket } from 'ws';
import { activeGameRooms, clients, rooms, users, winners } from '../db';
import {
  ResponseReg,
  RequestReg,
  Operation,
  ResponseUpdateRoom,
  ResponseUpdateWinners,
  RequestAddUserToRoom,
  Room,
  ResponseCreateGame,
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
    users.set(ws, { name, password, index: id, ws });
  }

  ws.send(parseJsonToString<ResponseReg>(Operation.REG, answerData));
}

export function updateRoom() {
  users.forEach((user) => {
    user.ws.send(
      parseJsonToString<ResponseUpdateRoom>(Operation.UPDATE_ROOM, rooms),
    );
  });
}

export function updateWinners() {
  users.forEach((user) => {
    user.ws.send(
      parseJsonToString<ResponseUpdateWinners>(
        Operation.UPDATE_WINNERS,
        winners,
      ),
    );
  });
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

export function addUserToRoom(ws: WebSocket, data: RequestAddUserToRoom) {
  const user = users.get(ws);
  const roomIndex = rooms.findIndex((room) => {
    return room.roomId === data.indexRoom;
  });

  if (
    roomIndex !== -1 &&
    user &&
    rooms[roomIndex].roomUsers[0].index !== user.index
  ) {
    rooms[roomIndex].roomUsers.push({
      name: user.name,
      index: user.index,
    });
    const activeRoom = rooms.splice(roomIndex, 1)[0];

    createGame(activeRoom);
  }
}

export function createGame(room: Room) {
  const idGame = crypto.randomUUID();

  activeGameRooms.push({
    idGame,
    room,
  });
  users.forEach((user) => {
    room.roomUsers.forEach((item) => {
      if (item.index === user.index) {
        user.ws.send(
          parseJsonToString<ResponseCreateGame>(Operation.CREATE_GAME, {
            idGame,
            idPlayer: crypto.randomUUID(),
          }),
        );
      }
    });
  });
}
