const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Carriage = sequelize.define("carriage", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seats: {
        type: Sequelize.INTEGER,
    }
});

Carriage.sync();

module.exports = Carriage;
