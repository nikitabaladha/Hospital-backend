"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");
const Appointment = require("./appointment");
const DrInfo = require("./drinfo");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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

  user.associate = (models) => {
    user.hasMany(models.appointments, {
      foreignKey: "patientId",
      as: "PatientAppointments",
    });
    user.hasMany(models.appointments, {
      foreignKey: "doctorId",
      as: "DoctorAppointments",
    });
    user.hasMany(models.drInfos, { foreignKey: "userId" });
  };
  return user;
};
