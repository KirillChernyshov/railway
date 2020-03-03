const Sequelize = require("sequelize");

const sequelize = new Sequelize("railway", "root", "", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
});

module.exports = sequelize;
