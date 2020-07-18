const sql = require("./database/db.js");

//constructor
const Chats = function (chat) {
  this.receiverUsername = chat.username;
  this.senderUsername = chat.senderUsername;
  this.receiverEmail = chat.receiverEmail;
  this.message = chat.message;
  this.date = chat.date;
};

Chats.create =  async (newChat, result) => {
  try{
    let newChatDetails = await sql.insert('chats',newChat);
    if (newChatDetails){
      console.log("Chat created: ", { chatid: newChatDetails.userid, ...newChatDetails });
      result(null, { chatid: newChatDetails.chatid, ...newChatDetails });
    }else {
      console.log("Chat created: ", newChatDetails);
      result(newChatDetails, null);
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
Chats.getChats = async (receiverUsername, senderUsername, result) => {
  let chats = await sql.getChats(receiverUsername, senderUsername);
  if (!chats) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, chats);
  }
};