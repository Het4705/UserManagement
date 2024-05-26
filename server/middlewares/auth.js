const { getUser } = require("../services/tokenGeneration");

function checkUserAuthentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            msg: "login to access api, provide as",
            details: "login to access api, provide email and password parameters"
        });
    }
    const user = getUser(token);
    if (!user) {
        return res.status(401).json({
            msg: "login",
            details: "login to access api, provide email and password parameters"
        });
    }
    next();
}

module.exports = {
    checkUserAuthentication
}
