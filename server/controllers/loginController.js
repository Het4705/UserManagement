const bcrypt = require('bcrypt');
const User = require('../models/usersModel');
const {
    setUser
} = require('../services/tokenGeneration');

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        console.log(email, password)
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(400).json({
                msg: "User not found, please check credentials."
            });
        }
        // console.log(user.password)
        if (user.role != "Admin") { // Fixed the role check
            return res.status(403).json({
                msg: "Access denied. Admin role required."
            });
        }
        // console.log(password)
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    msg: "Error while comparing passwords."
                });
            }
            console.log(result)

            if (result) {

                const token = setUser(user); //setUser generates a token
                console.log(token)
                res.cookie('token', token, {
                    domain: process.env.FRONTEND_URL, // Extract hostname to set the domain
                    path: '/', // Cookie is accessible from all paths
                    expires: new Date(Date.now() + (3600000 * 10)), // Cookie expires in 10 hours
                    httpOnly: true, // Cookie is accessible only through HTTP requests, not JavaScript
                    secure: true // Cookie is only sent over HTTPS
                });
                // Set the token in the cookie
                return res.status(200).json({
                    msg: "Login successful."
                });
            } else {
                return res.status(400).json({
                    msg: "Incorrect password."
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Server error, can't login."
        });
    }
};

module.exports = {
    login
};