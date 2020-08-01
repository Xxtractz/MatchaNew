const sql = require("./database/db.js");

//constructor
const Core = function (notify) {
};

Core.visit = () =>{
  try{}catch (e) {
  }
}

Core.like = ( )=>{
  try {

  }catch (e) {

  }
}

Core.createNotification =  async (newNotify, result) => {
  try{
    await sql.insert('notifications',newNotify);
    result(null, { Notification : "Updated notifications" });
  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
       let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
};

Core.getNotificationsCount = async (username, result) =>{
  try{
    let results = await sql.getNewNotifications(username);
    result(null, { results });
  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
      let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
}

Core.getNotifications = async (username, result) =>{
  try{
     let notifications = await sql.getNotifications(username);
    console.log(notifications);
    result(null, notifications);
  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
      let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
}


module.exports = Core;