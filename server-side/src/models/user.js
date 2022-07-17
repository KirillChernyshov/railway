const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../db/index.js");

const User = sequelize.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

User.generateAuthToken = async (user) => {
    const token = jwt.sign({ id: user.id }, "NewYear");
    user.token = await user.update({ token: token });
    return token
};

User.findByCredentials = async (email, password) => {
    var user = await User.findOne({
        where: {
            email: email,
        }
    });

    if (user && user.password === password)
        return user;
};

User.sync();

module.exports = User;
