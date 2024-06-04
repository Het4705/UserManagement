const express = require("express");
const upload = require("../services/multer")

const {
    addUser,
    getUser,
    getUsersSortedByCreationDate,
    updateUser,
    updateUserStatus,
    deleteUser,
    getSearchedUser
} = require("../controllers/userController")
const router = express.Router();


router.post('/', upload.single('image'), addUser)
    .get("/", getUser)
    .post("/search",getSearchedUser)
    .get("/sorted", getUsersSortedByCreationDate)
               //* here in upload.single(key) key should be same as the key for data coming from client 
    .put("/",upload.single('profilePicture') ,updateUser)
    .put("/status", updateUserStatus)
    .delete("/", deleteUser)

module.exports = router