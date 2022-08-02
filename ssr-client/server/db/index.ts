import {Sequelize} from "sequelize";
import {useRuntimeConfig} from "#imports";
import pg from 'pg';

const config = useRuntimeConfig();

const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUsername,
    password: String(config.dbPassword),
    dialect: "postgres",
    dialectModule: pg,
    host: config.dbHost || 'localhost',
    logging: false, //(msg) => console.log('DB: ', msg),
    define: {
        timestamps: false,
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
