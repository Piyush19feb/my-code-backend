const dot = require("dotenv");
dot.config();
/* eslint no-process-env:0 */
const store = {
  mongo_uri: process.env.MONGODB,
  mongo_dbName: "LeetcodeIo",
};

module.exports = store;
