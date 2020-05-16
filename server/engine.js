const {
  io
} = require('./app');
const CONSTANTS = require('../common/constants');
const {
  v4: uuidv4
} = require('uuid');
const randomstring = require('randomstring');

const consola = require('consola')

const engine = {};
engine.io = io;
engine.rooms = {};

io.on('connection', (socket) => {
  delete socket.userId;
  delete socket.gameCode;

  socket.on(CONSTANTS.SOCKET.ON.JOIN_GAME, (data) => {
    const {
      game,
      name
    } = data;
    socket.join(game);
    socket.userId = uuidv4();
    socket.gameCode = game;

    consola.info("Joined: " + name);
    consola.info(socket);
    io.to(game).emit(CONSTANTS.SOCKET.EMIT.JOIN_GAME, {
      data: 'joined'
    });
  });

  socket.on(CONSTANTS.SOCKET.ON.CREATE_GAME, (data) => {
    const {
      name
    } = data;
    let gameCode;
    do {
      gameCode = generateRoomCode();
    } while (!isValidRoomCode(gameCode, engine.rooms));

    createRoom(gameCode, data);
    socket.join(gameCode);
    socket.userId = uuidv4();
    socket.gameCode = gameCode;

    console.info("Created: " + name);
    io.to(gameCode).emit(CONSTANTS.SOCKET.EMIT.CREATE_GAME, {
      game: gameCode
    });
  });
});

// 26 (alphabet) ^ 4 (code_length) = 456,976 * 3 (min_players) = 1,370,928 player max at one time.
function generateRoomCode() {
  return randomstring.generate({
    length: 4,
    charset: 'alphabetic',
    capitalization: 'lowercase'
  });
}

function isValidRoomCode(code, rooms) {
  let banned_codes = ['join', 'code', 'game', 'name', 'lang', 'test'];
  if (code in rooms || banned_codes.indexOf(code) > -1) {
    return false;
  }

  return true;
}

const createRoom = (code, host) => {
  engine.rooms[code] = {
    host: host,
    createdTime: new Date(),
    players: [host]
  }
}

const isInGame = (id, code) => {
  if (engine.rooms[code]) {
    return engine.rooms[code].players.some(p => p.id === id);
  }
  return false;
}

module.exports = engine;