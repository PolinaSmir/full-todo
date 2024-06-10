const mongoose = require("mongoose");
const { DB } = require("../configs/db");
const User = require("./User");

async function start() {
  await mongoose.connect(DB).catch((err) => {
    console.log(`Connect failed: ${err.message}`);
  });
}
start();

module.exports = {
  User,
};
