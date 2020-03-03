const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

let Train = require("train.js");
let Carriage = require("carriage.js");

const Composition = sequelize.define("composition", {

});

Composition.hasMany(Train);
Composition.hasMany(Carriage);

Composition.sync();

module.exports = Composition;
