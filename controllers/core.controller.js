const Core = require('../models/core.model');

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
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    if (req.body.type === "like"){
        console.log("like ===> ")
        const likeMessage = {
            sender: req.body.sender,
            receiver: req.body.receiver,
        }
        await Core.addLikes(likeMessage, (err, data) => {
            if (err) {
                res.status(404).send({like: "Error adding like "});
            }
            res.status(200).send(data);
        });

    }else if(req.body.type === "dislike"){

        console.log("dislike ===>")
        const dislikeMessage = {
            sender: req.body.sender,
            receiver: req.body.receiver,
        }
        await Core.removeLikes(dislikeMessage, (err, data) => {
            if (err) {
                res.status(404).send({like: "Error adding dislike "});
            }
            res.status(200).send(data);
        });
    }
}

exports.getMyLike = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    if (req.params.id){
        await Core.getMyLike(req.params.id, (err, data) => {
            console.log("get My Like Response  ======>",err)
            console.log("get My Like Response  ======>",data)
            if (err) {
                res.status(404).send({like: "Error adding like "});
            }
            res.status(200).send(data);
        });

    }
}

exports.getLikeBack = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    console.log(req.body);
    await Core.getLikedBack(req.body.sender,req.body.receiver, (err, data) => {
        console.log("get likeBack Response  ======>",err)
        console.log("get likeBack Response  ======>",data)
        if (err) {
            res.status(404).send({like: "Error adding like "});
        }
        res.status(200).send(data);
    });
}

exports.getMatches = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            User: "Content can not be empty."
        });
    }
    console.log(req.params.id)
    if (req.params.id){
        await Core.getMyMatches(req.params.id, (err, data) => {
            console.log("get my Matches Response  ======>",err)
            console.log("get My Matches Response  ======>",data)
            if (err) {
                res.status(404).send({like: "Error adding like "});
            }
            res.status(200).send(data);
        });

    }
}