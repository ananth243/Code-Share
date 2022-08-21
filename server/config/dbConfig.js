const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports.dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error(error);
  }
};

module.exports.sequelize = sequelize;
