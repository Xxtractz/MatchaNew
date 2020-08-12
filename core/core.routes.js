const app = require('express').Router();
const Core = require("../controllers/core.controller");

    // Notifications
    app.post("/notifications", Core.addNotifications);
    app.get("/notifications/:username", Core.getNotificationsCount);
    app.get("/notifications", Core.getNotifications);

    //getting chats for two users
    app.post("/likes", Core.like);
    app.post("/likes/back", Core.getLikeBack);
    app.get("/likes/:id", Core.getMyLike);

    app.get("/matched/:id", Core.getMatches);

    module.exports= app;