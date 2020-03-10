const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Carriage = sequelize.define("carriage", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seats: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Carriage;
