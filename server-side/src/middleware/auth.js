const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async(req, res, next) => {
    console.log(req.body);
    if (!req.header('Authorization')) {
        res.status(401).send({ errorMessage: "Неавторизованный пользователь"});
        return;
    }

    const token = req.header('Authorization').split(' ')[1];
    const data = jwt.verify(token, "NewYear");

    let user = await User.findOne({
        where: {
            id: data.id,
            token: token,
        }
    });

    if (!user) {
        res.status(401).send({ errorMessage: "Неавторизованный пользователь"});
        return;
    }

    req.user = user
    req.token = token
    next()
}

module.exports = auth;
