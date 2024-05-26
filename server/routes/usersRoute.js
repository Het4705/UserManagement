const express = require("express");
const upload = require("../services/multer")

const {
    addUser,
    getUser,
    getUsersSortedByCreationDate,
    updateUser,
    updateUserStatus,
    deleteUser
} = require("../controllers/userController")
const router = express.Router();


router.post('/', upload.single('image'), addUser)
    .get("/", getUser)
    .get("/sorted", getUsersSortedByCreationDate)
    .put("/", updateUser)
    .put("/status", updateUserStatus)
    .delete("/", deleteUser)

module.exports = router