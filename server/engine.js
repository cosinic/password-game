const {
  server
} = require('./app');
const io = require('socket.io')(server);

const engine = {};
engine.io = io;
engine.rooms = {};

io.on('connection', (socket) => {
    delete socket.userId;
    delete socket.gameCode;

    socket.use(function (packet, next) {
      if ('userId' in socket && 'gameCode' in socket) {
        if (isInGame(socket.userId, socket.gameCode)) {
          // Can't join twice
          if (packet[0] !== 'JOIN') {
            next();
            return;
          }
        }
      } else if (packet[0] === 'JOIN') {
        next();
        return;
      }
    });

    socket.on('JOIN', user => {
        const {
          room,
          name
        } = user;
        socket.join(room);
        console.log("Joined: " + name);
    })
});

module.exports = engine;