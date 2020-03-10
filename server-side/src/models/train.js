const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

let Composition = require("./composition.js");

const Train = sequelize.define("train", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Train;
