import { WebSocket } from 'ws';
import { clients, users } from '../db';
import { ResponseReg, RequestReg, Operation } from '../types';
import { parseJsonToString } from '../utils/utils';

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
