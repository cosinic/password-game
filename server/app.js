require('dotenv').config({
  path: __dirname + '../.env'
});

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

module.exports = {
  app,
  server,
  io
}