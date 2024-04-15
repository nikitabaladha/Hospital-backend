// models/user.js

"use strict";
const { v4: uuidv4 } = require("uuid");
const { DataTypes, Sequelize } = require("sequelize");
const model = require("../models");

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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    salt: {
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
    user.hasMany(models.doctorforms, {
      foreignKey: "userId",
    });
    user.hasMany(models.appointments, {
      foreignKey: "doctorId",
    });
    user.hasMany(models.appointments, {
      foreignKey: "patientId",
    });
  };

  return user;
};
