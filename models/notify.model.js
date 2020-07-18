const sql = require("./database/db.js");

//constructor
const Notifications = function (notify) {
  this.receiverUsername = notify.username;
  this.senderUsername = notify.senderUsername;
  this.receiverEmail = notify.receiverEmail;
  this.message = notify.message;
  this.seen = notify.seen;
};

Notifications.create =  async (newNotify, result) => {
  try{
    let newNotifyDetails = await sql.insert('notifications',newNotify);
    if (newNotifyDetails){
      console.log("Notification created: ", { chatid: newNotifyDetails.userid, ...newNotifyDetails });
      result(null, { chatid: newNotifyDetails.chatid, ...newNotifyDetails });
    }else {
      console.log("Notification created: ", newNotifyDetails);
      result(newNotifyDetails, null);
    }
  }catch (e) {
    console.log(e);
    if(e.code ==='ER_DUP_ENTRY'){
       let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
};

//get chats of two people
Notifications.getNotifications = async (receiverUsername, senderUsername, result) => {
  let notifications = await sql.getNotifications(receiverUsername, senderUsername);
  if (!notifications) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, notifications);
  }
};