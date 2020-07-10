const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Station = sequelize.define("station", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Station;
