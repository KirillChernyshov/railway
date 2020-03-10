const Sequelize = require("sequelize");

const sequelize = new Sequelize("railway", "root", "", {
    dialect: "mysql",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false,
    }
});

module.exports = sequelize;
