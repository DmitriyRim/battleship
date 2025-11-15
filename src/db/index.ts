import { WebSocket } from 'ws';
import { User } from '../types';

export const clients = new Map<WebSocket, string | number>();
export const users = new Map<WebSocket, User>();
