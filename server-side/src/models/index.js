const sequelize = require("../db/index.js");

const models = {
    Train: require("./train.js"),
    Carriage: require("./carriage.js"),
    Composition: require("./composition.js"),
    Station: require("./station.js"),
    Route: require("./route.js"),
    Route_Station: require("./route_station.js"),
}

models.Composition.hasMany(models.Train, {as: 'Trains'});
models.Composition.hasMany(models.Carriage, {as: 'Carriages'});
models.Route.hasOne(models.Composition);
//models.Composition.belongsTo(models.Route, { as: 'route' });
models.Route.belongsToMany(models.Station, { through: models.Route_Station });
models.Station.belongsToMany(models.Route, { through: models.Route_Station });

console.log('sync');
sequelize.sync();

module.exports = models;
