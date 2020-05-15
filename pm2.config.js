module.exports = {
  apps : [{
    name: 'password_game',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: ["node_modules"],
    max_memory_restart: '500M',
    error_file: "./logs/err.log",
    out_file: "./logs/out.log",
    time: true,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3010
    }
  }],
};
