const app = require('express').Router();
const users = require("../controllers/user.controller.js");

    //registering the user
    app.post("/users/register", users.create);

    //user login
    app.post("/users/login", users.login);

    //check if email already exists
    app.post("/users/checkEmail", users.checkEmail);

    //check if username already exists
    app.post("/users/checkUsername", users.checkUsername);

    //verification for forgot password
    app.post("/users/reset", users.resetPassword);

    //verification for invalid token and getting new token
    app.post("/users/verifyAgain", users.verifyAgain);

    //users token check if exists
    app.post("/users/checkToken", users.checkToken);

    //changing the password of the user
    app.post("/users/changePassword", users.changePassword);

    //logout a user and update last seen
    app.post("/users/logout", users.logout);

    //refreshing the token 
    app.post("/users/refresh", users.refreshToken);

    //verify the user after registration
    app.get("/users/verify/:id", users.verifyReg);

    //getting all the users in the database
    app.post("/interests/:userid", users.findAllInterests);

    //getting all the users in the database
    app.post("/users/:gender", users.findAll);

    //getting all the users in the database
    app.get("/users", users.findAll);

    //get a user by their userid
    app.get("/users/:userid", users.findOne);

    //update a user by their id
    app.post("/users/update/:userid", users.update);

    //delete a user by their id
    app.delete("/users/:userid", users.delete);

    //delete all the users in the database
    app.delete("/users", users.deleteAll);

    //Perform Installation to DB
    app.post("/installation", users.install);

    //Perform Installation to DB
    app.post("/uninstall", users.uninstall);

    module.exports= app;