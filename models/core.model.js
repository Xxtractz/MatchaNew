const sql = require("./database/db.js");

//constructor
const Core = function (notify) {
};

Core.visit = () =>{
  try{}catch (e) {
  }
}

Core.getMyLike = async (id,result)=>{
  try{
    const myLikes = await sql.getMyLikes(id);
    console.log("Mylikes -====>",myLikes)
      result(null, myLikes);

  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
      let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
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

Core.addLikes = async (likeMessage, result) =>{
  try{
    let liked = await sql.like(likeMessage);
    console.log(liked);
    result(null, liked);
  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
      let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
}

Core.removeLikes = async (likeMessage, result) =>{
  try{
    let disliked = await sql.disLike(likeMessage.sender,likeMessage.receiver);
    console.log(disliked);
    result(null, disliked);
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