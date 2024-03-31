"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("availabilities", {
      fields: ["userId", "day"],
      type: "unique",
      name: "unique_userId_day_constraint",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "availabilities",
      "unique_userId_day_constraint"
    );
  },
};
