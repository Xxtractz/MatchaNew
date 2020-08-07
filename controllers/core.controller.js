const Core = require('../models/core.model');
const commonFunction = require("./commonFunctions");
const CryptoJS = require('crypto-js');


exports.addNotifications = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
        const notifications = {
            receiver: req.body.receiver,
            sender: req.body.sender,
            message: req.body.message
        }

        await Core.createNotification(notifications, (err, data) => {
            console.log("Update \n\n Interests ==> err", err);
            console.log("\n\n\nUpdate \n\n Interests ==> data", data);
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        User: `Not found user with id ${req.params.userid}.`
                    });
                } else {
                    res.status(500).send({
                        User: "Error updating user with ID " + req.params.userid
                    });
                }
            }
            res.status(200).send({Notify: data});
        });

}

exports.getNotificationsCount =  async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }

    await Core.getNotificationsCount(req.body.username, (err, data) => {
        console.log("Update \n\n Interests ==> err", err);
        console.log("\n\n\nUpdate \n\n Interests ==> data", data);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: `Not found user with id ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    User: "Error updating user with ID " + req.params.userid
                });
            }
        }
        res.status(200).send({Notify: data});
    });

}

exports.getNotifications = async  (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    await Core.getNotifications(req.query.username, (err, data) => {
        console.log("Data from Notification  ==> ",data );
        if (err) {
            res.status(404).send({notification:"Error updating user with Username "});
        }
        res.status(200).send(data);
    });

}

exports.like = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    if (req.body.type === "like"){
        const likeMessage = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            liked: 1
        }
        await Core.addLikes(likeMessage, (err, res) => {
            if (err) {
                res.status(404).send({like: "Error adding like "});
            }
            res.status(200).send(data);
        });

    }else if(req.body.type === "dislike"){
        const dislikeMessage = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            liked: 0
        }
        await Core.addLikes(dislikeMessage, (err, res) => {
            if (err) {
                res.status(404).send({like: "Error adding dislike "});
            }
            res.status(200).send(data);
        });
    //    un-match if matched
    }
}

