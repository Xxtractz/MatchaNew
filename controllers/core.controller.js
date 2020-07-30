const Core = require('../models/core.model');
const commonFunction = require("./commonFunctions");
const CryptoJS = require('crypto-js');


exports.addNotifications = async (req, res) => {

}

exports.getNotifications = async (req, res) => {

}

exports.like = async (req, res) => {

}

exports.dislike = async (req, res) => {

}

exports.create = async (req, res) => {
    const date = new Date(Date.now()).toLocaleString();

    const bytes  = CryptoJS.AES.decrypt(req.body.chat, 'StopShhh');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!decryptedData.receiverUsername &&
        !decryptedData.senderUsername &&
        !decryptedData.receiverEmail &&
        !decryptedData.message) {
        res.status(400).send({
            Chat: "Content can not be empty"
        });
    }


    const notify = new Notifications({
        receiverUsername: decryptedData.receiverUsername,
        senderUsername: decryptedData.senderUsername,
        receiverEmail: decryptedData.receiverEmail,
        message: decryptedData.message,
        seen: false,
    });

    Notifications.create(notify, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                Chat: "Some error occurred while saving chat."
            });
        } else {
            commonFunction.sendEmail(
                decryptedData.email,
                "You got a notification",
                '<p> Login to see the message you getting hits.</p>'
            );
            console.log(data);
            res.status(200).send({Notify: data});
        }
    });

};

exports.getNotifications = async (req, res) => {
    const bytes  = CryptoJS.AES.decrypt(req.body.chat, 'StopShhh');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (!decryptedData.receiverUsername &&
        !decryptedData.senderUsername) {
        res.status(400).send({
            Notify: "Content can not be empty"
        });
    }
    Notifications.getNotifications(decryptedData.receiverUsername, decryptedData.senderUsername, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    User: `Not found notifications with usernames ${decryptedData.receiverUsername} and ${decryptedData.senderUsername}.`
                });
            } else {
                res.status(500).send({
                    User: `Error getting notifications with usernames ${decryptedData.receiverUsername} and ${decryptedData.senderUsername}.`
                });
            }
        } else {
            res.status(200).send({ Notifications: data });
        }
    });
};