const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Route = sequelize.define("route", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
    },
});

module.exports = Route;
