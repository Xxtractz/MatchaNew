const sql = require("./database/db.js");

//constructor
const Core = function (notify) {
};

Core.create =  async (newNotify, result) => {
  try{
    let newNotifyDetails = await sql.insert('notifications',newNotify);
    result(null, { chatid: newNotifyDetails.chatid, ...newNotifyDetails });
  }catch (e) {
    if(e.code ==='ER_DUP_ENTRY'){
       let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
};

module.exports = Core;