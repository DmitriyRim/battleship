import { activeUsersInGame, games } from '../db';
import {
  Operation,
  RequestAttack,
  ResponseAttack,
  ResponseTurn,
  Ship,
} from '../types';
import { parseJsonToString } from '../utils/utils';

export function turn(gameId: string | number) {
  const currentPlayer = activeUsersInGame.get(gameId);
  const game = games.get(gameId);

  if (currentPlayer && game) {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    Object.values(game).forEach((user) => {
      user?.ws.send(
        parseJsonToString<ResponseTurn>(Operation.TURN, {
          currentPlayer: nextPlayer,
        }),
      );
    });

    activeUsersInGame.set(gameId, nextPlayer);
  }
}

export function attack(data: RequestAttack) {
  const game = games.get(data.gameId);
  const currentPlayer = activeUsersInGame.get(data.gameId);
  const { x, y, indexPlayer } = data;
  const nextPlayer = indexPlayer === 1 ? 2 : 1;
  const ships: Ship[] | undefined = game && game[nextPlayer]?.data.ships;
  const hitsMap: Record<number, Set<string>> = {};
  let hitShipIndex: number | null = null;

  if (ships && game && currentPlayer) {
    ships.forEach((ship, index) => {
      for (let i = 0; i < ship.length; i++) {
        const cellX = ship.direction ? ship.position.x + i : ship.position.x;
        const cellY = ship.direction ? ship.position.y : ship.position.y + i;

        if (cellX === x && cellY === y) {
          hitShipIndex = index;
        }
      }
    });

    if (hitShipIndex === null) {
      Object.values(game).forEach((user) => {
        user?.ws.send(
          parseJsonToString<ResponseAttack>(Operation.ATTACK, {
            position: { x, y },
            currentPlayer,
            status: 'miss',
          }),
        );
      });
      return;
    }

    if (!hitsMap[hitShipIndex]) hitsMap[hitShipIndex] = new Set();
    hitsMap[hitShipIndex].add(`${x},${y}`);

    const ship = ships[hitShipIndex];

    let aliveSegments = 0;

    for (let i = 0; i < ship.length; i++) {
      const cellX = ship.direction ? ship.position.x + i : ship.position.x;
      const cellY = ship.direction ? ship.position.y : ship.position.y + i;

      if (!hitsMap[hitShipIndex].has(`${cellX},${cellY}`)) {
        aliveSegments++;
      }
    }

    Object.values(game).forEach((user) => {
      user?.ws.send(
        parseJsonToString<ResponseAttack>(Operation.ATTACK, {
          position: { x, y },
          currentPlayer,
          status: aliveSegments === 0 ? 'killed' : 'shot',
        }),
      );
    });
  }
}
