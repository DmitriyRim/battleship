export enum Operation {
  REG = 'reg',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  TURN = 'turn',
  FINISH = 'finish',
}
export type Dto<T> = {
  type: Operation;
  data: T;
  id: 0;
};

export type User = {
  name: string;
  password: string;
  index: string | number;
};

export type RequestReg = {
  name: string;
  password: string;
};

export type ResponseReg = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

export type ResponseUpdateWinners = [
  {
    name: string;
    wins: number;
  },
];

export type RequestCreateRoom = {
  data: '';
};

export type RequestAddUserToRoom = {
  indexRoom: number | string;
};

export type ResponseCreateGame = {
  idGame: number | string;
  idPlayer: number | string;
};

export type ResponseUpdateRoom = [
  {
    roomId: number | string;
    roomUsers: [
      {
        name: string;
        index: number | string;
      },
    ];
  },
];

export type RequestAddShips = {
  gameId: number | string;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    },
  ];
  indexPlayer: number | string;
};

export type ResponseStartGame = {
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    },
  ];
  currentPlayerIndex: number | string;
};
// ------------------------ Attack

export type RequestAttack = {
  gameId: number | string;
  x: number;
  y: number;
  indexPlayer: number | string;
};

export type ResponseAttack = {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number | string;
  status: 'miss' | 'killed' | 'shot';
};

export type RequestRandomAttack = {
  gameId: number | string;
  indexPlayer: number | string;
};

export type ResponseTurn = {
  currentPlayer: number | string;
};

export type ResponseFinish = {
  winPlayer: number | string;
};
