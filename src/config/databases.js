const config = {
    mongodb: {
      cluster: process.env.DB_CLUSTER,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  };
  
  module.exports = config;
  