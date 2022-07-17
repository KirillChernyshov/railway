const Sequelize = require("sequelize");

const sequelize = new Sequelize("railway", "railway", "1234", {
    dialect: "postgres",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,
    }
});

module.exports = sequelize;
