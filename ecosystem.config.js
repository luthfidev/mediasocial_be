require('dotenv').config()

module.exports = {
  apps: [{
    name: 'mediasocial_be',
    script: 'bin/www',
    watch: true,
    max_memory_restart: '1G',
    instances: 1,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster_mode",
    // out_file: "~/.pm2/logs/erp-local-api-out.log",
    // error_file: "~/.pm2/logs/erp-local-api-error.log",
    ignore_watch : ["node_modules", "public"],
    env: {
      NODE_ENV: 'local',
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT,
      DB_DIALECT: process.env.DB_DIALECT,
      JWT_KEY: process.env.JWT_KEY,
    },
    env_development: {
      NODE_ENV:  "development"
    },
    env_production: {
      NODE_ENV:  "production"
    }
  }]
};
