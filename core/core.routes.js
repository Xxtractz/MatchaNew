const app = require('express').Router();
const Core = require("../controllers/core.controller");

    // Notifications
    app.post("/notifications", Core.addNotifications);
    app.get("/notifications", Core.getNotifications);

    //getting chats for two users
    app.post("/notify/get", Core.getNotifications);

    module.exports= app;