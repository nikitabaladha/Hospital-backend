// models/availability

"use strict";
const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const availability = sequelize.define("availabilities", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  availability.associate = (models) => {
    availability.belongsTo(models.users, { foreignKey: "userId" });
  };

  return availability;
};
