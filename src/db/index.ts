import { WebSocket } from 'ws';
import { Room, User } from '../types';

export const clients = new Map<WebSocket, string | number>();
export const users = new Map<WebSocket, User>();
export const rooms: Room[] = [];
export const activeGameRooms: {
  idGame: string | number;
  room: Room;
}[] = [];
export const winners = [];
