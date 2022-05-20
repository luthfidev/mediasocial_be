const mongoose = require("mongoose");
const config = require("../config/databases");


const db = mongoose
db.connect(
  `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@cluster0.dhey9.mongodb.net/${config.mongodb.database}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )
  .then(() => {
    console.log("connected mongodb");
  })
  .catch((error) => {
    console.log("error", error);
  });
  
      db.connection.on("connected", () => {
      console.log("Mongoose connected to DB Cluster");
    });

    db.connection.on("error", (error) => {
      console.error(error.message);
    });

    db.connection.on("disconnected", () => {
      console.log("Mongoose Disconnected");
    });

    // process.on('SIGINT', () => {
    //     connection.close(() => {
    //         console.log('Mongoose connection closed on Application Timeout');
    //         process.exit(0);
    //     })
    // })
    module.exports = db;
