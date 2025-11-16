import { WebSocket } from 'ws';
import { RequestAddShips, Room, User } from '../types';

export const clients = new Map<WebSocket, string | number>();
export const users = new Map<WebSocket, User>();
export const rooms: Room[] = [];
export const games = new Map<
  string | number,
  { [key: string | number]: null | { ws: WebSocket; data: RequestAddShips } }
>();
export const winners = [];
export const activeUsersInGame = new Map<string | number, string | number>();
