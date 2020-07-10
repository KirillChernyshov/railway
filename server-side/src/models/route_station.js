const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Route_Station = sequelize.define("Route_Station", {
    order: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    delay: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    dist: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Route_Station;
