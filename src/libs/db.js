// This file contains the configuration for the database connection

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "sesgocero",
      // useCreateIndex: true
    });

    console.log(
      `🟢 MongoDB Connected: ${conn.connection.host} - ${conn.connection.name} - ${conn.connection.db.databaseName}`
    );
  } catch (err) {
    console.error(`🛑 Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
