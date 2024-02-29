"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");
const User = require("./user");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const drInfo = sequelize.define("drInfos", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    charge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
  drInfo.associate = (models) => {
    drInfo.belongsTo(models.users, { foreignKey: "userId" });
  };

  return drInfo;
};
