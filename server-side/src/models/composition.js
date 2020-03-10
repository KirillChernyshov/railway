const Sequelize = require("sequelize");
const sequelize = require("../db/index.js");

const Composition = sequelize.define("composition", {

});

//Composition.hasMany(Train, {as: 'Trains'});

/*Composition.findAndCountAll({
    limit: 10,
    include: [{ model: Train, as: 'Trains' }],
}).then((result) => {
    console.log(result.rows);
})*/

module.exports = Composition;
