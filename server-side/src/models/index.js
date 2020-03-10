const sequelize = require("../db/index.js");

const models = {
    Train: require("./train.js"),
    Carriage: require("./carriage.js"),
    Composition: require("./composition.js"),
}

models.Composition.hasMany(models.Train, {as: 'Trains'});
models.Composition.hasMany(models.Carriage, {as: 'Carriages'});

console.log('sync');
sequelize.sync();

module.exports = models;
