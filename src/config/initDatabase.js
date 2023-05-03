const mongoose = require("mongoose");
const config = require("./configuration");

async function initDatabase() {
  await mongoose.connect(config.DB_URI);

  console.log('DB Connected');
}

module.exports = initDatabase;
 