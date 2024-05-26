const express = require('express');
const connection = require('./services/connection.js');
const bodyParser = require('body-parser');
const userRouter = require("./routes/usersRoute.js");
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const {
    login
} = require("./controllers/loginController.js")
const {
    checkUserAuthentication
} = require("./middlewares/auth.js")




require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api/users", checkUserAuthentication, userRouter);

connection.connectMongoDB(process.env.URL);

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/login", login)
app.post('/logout',checkUserAuthentication, (req, res) => {

    res.clearCookie('token', { path: '/' });
    res.clearCookie('login', { path: '/' });
    console.log("logout")
    res.send({ message: 'Logout successful' });
    
  });


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port} 🔥`);
});

module.exports = app