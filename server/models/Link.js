const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Link = sequelize.define(
  "links",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    }
  },
  { timestamps: true }
);

module.exports = Link;
