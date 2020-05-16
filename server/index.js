require('dotenv').config({
  path: __dirname + '../.env'
});

const consola = require('consola');
const {
  Nuxt,
  Builder
} = require('nuxt');
const {
  app,
  server
} = require('./app');

const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host,
    port
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Import main Game Engine
  app.io = require('./engine');

  // Nuxt Middleware
  app.use(nuxt.render);

  server.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}
start();