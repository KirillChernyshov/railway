const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Train = sequelize.define("train", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Train.sync();

module.exports = Train;
