//Initial
const express = require("express");
const app = express();

//Configs
const path = require("path");
const PORT = process.env.PORT || 4000;
const server = require("http").Server(app);
// const server = app.listen(port,() => console.log(`Server Running on Port => ${port}`));
// const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

//Util
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//Routes
const userRoutes = require('./core/user.routes');
const notifyRoutes = require('./core/core.routes');

//SocketIO
const io = require('socket.io')(server);
// const SocketManager = require('./core/SocketManager');
io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User Connected: ${id}`);
    socket.on("chat message", ({ nickname,receiver, msg }) => {
        console.log(nickname,receiver,msg);
        io.emit("chat message", { nickname,receiver, msg });
    });
});
//Connect to Socket
// io.sockets.on("connection", SocketManager);

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));

//adding routes
app.use('/', userRoutes); 

//adding routes
app.use('/', notifyRoutes); 

//require the fastify framework and instantiate it
app.use(function(req, res, next) {
    //exclude other routes
    // console.log(req);
    if (
        (req.method === "POST") ||
        (req.method === "GET" )||
        (req.method === "POST" && req.url === "/logout") ||
        (req.method === "POST" && req.url === "/users/register") ||
        (req.method === "POST" && req.url === "/verifyAgain") ||
        (req.method === "GET" && req.url === "/socket.io/socket.io.js")
    ) {
        console.log("next before =>",req.url);
        next();
    } else {
        console.log("next failed =>",req.url);
        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request methods you wish to allow
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS, PUT, PATCH, DELETE, POST"
        );

        // Request headers you wish to allow
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type, authorization"
        );

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", true);

        //console.log(req.headers);

        // check header for the token
        let token = req.headers["authorization"];
        // decode token
        if (token !== "undefined" && token) {
            let splittedToken = token.split(" ");
            jwt.verify(splittedToken[1], process.env.SECRETS, (err) => {
                if (err) {
                    console.log(err);
                    res.status(401).send("Token has expired");
                }
                next();
            });
        } else {
            // if there is no token
            res.status(401).send({
                message: "No token provided.",
            });
        }
    }
});

module.exports = app;