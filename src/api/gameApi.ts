import { activeUsersInGame, games } from "../db";
import { Operation, ResponseTurn } from "../types";
import { parseJsonToString } from '../utils/utils';

export function turn(gameId: string | number){
    const currentPlayer = activeUsersInGame.get(gameId);
    const game = games.get(gameId);

    if(currentPlayer && game){
            Object.values(game).forEach((user) => {
              user?.ws.send(
                parseJsonToString<ResponseTurn>(Operation.TURN, {
                    currentPlayer: currentPlayer === 1 ? 2 : 1
                }),
              );
            });
    }
}