// models/appointments

"use strict";
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const model = require("../models");

module.exports = (sequelize) => {
  const appointment = sequelize.define("appointments", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    disease: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
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

  appointment.associate = (models) => {
    appointment.belongsTo(models.users, {
      as: "doctor",
      foreignKey: "doctorId",
    });
    appointment.belongsTo(models.users, {
      as: "patient",
      foreignKey: "patientId",
    });
  };
  return appointment;
};
