const app = require('express').Router();
const chats = require("../controllers/chats.controller");

    //saving a chat
    app.post("/chats/save", chats.create);

    //getting chats for two users
    app.post("/chats/get", chats.getChats);

    module.exports= app;