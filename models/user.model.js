const sql = require("./database/db.js");
const dbSetup = require("./database/dbSetup.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//constructor
const User = function (user) {
  this.username = user.username;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.password = user.password;
  this.email = user.email;
  this.age = user.age;
  this.dob = user.dob;
  this.date = user.date;
};

User.create =  async (newUser, result) => {
  try{
    let newUserDetails = await sql.insert('users',newUser);
    if (newUserDetails){
      console.log("User created: ", { userid: newUserDetails.userid, ...newUserDetails });
      result(null, { userid: newUserDetails.userid, ...newUserDetails });
    }else {
      console.log("User created: ", newUserDetails);
      result(newUserDetails, null);
    }
  }catch (e) {
    console.log(e);
    if(e.code ==='ER_DUP_ENTRY'){
       let message = e.message.match(/(\x27).+(\x27) /gm);
      result(message[0],null);
    }
  }
};

User.logins = async (username, password, result) => {
  try {
    let user = await sql.findByUsername(username);
    if (!user) {
      result({ kind: "not_found" }, null);
    } else {
      bcrypt.compare(password, user.password, (err, response) => {
        console.log(response);
        if (response) {
          let interest = sql.getInterests(user.userid);
          let interestToString = [];

          for (let i = 0; i < interest.length; i++) {
            interestToString = interestToString.concat(interest[i].interest);
          }
          const userLog = {
            userid: user.userid,
            username: user.username,
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            gender: user.gender,
            genderPreference: user.genderPreference,
            age: user.age,
            profileImage: user.profileImage,
            active: user.active,
            lastseen: user.lastseen,
            dob: user.dob,
            date: user.date,
            bio: user.bio,
            status: user.status,
            interest: interestToString,
            notify: user.notify,
            longitude: user.longitude,
            latitude: user.latitude
          };

          if (user.status === '0') {
            return result({ kind: "notVerified" , token: jwt.sign(userLog, process.env.SECRETS)}, null);
          } else {
            const token = jwt.sign(userLog, process.env.SECRETS);
            const refreshToken = jwt.sign(
              userLog,
              process.env.REFRESHTOKENSECRETS,
              { expiresIn: process.env.REFRESHTOKENLIFE }
            );

            const response = {
              Token: token,
              RefreshToken: refreshToken,
            };

            sql.addLastSeen(user.username, "online");

            let resultsCallback = sql.saveAuth(
              user.userid,
              user.username,
              response.Token,
              response.RefreshToken
            );
            if (resultsCallback) {
              result(null, response);
            }
          }
        } else {
          return result({ kind: "bad_creds" }, null);
        }
      });
    }
  } catch (err) {
    console.log("Error in logins: ", err);
    return result(err, null);
  }
};

User.refreshToken = async (username, result) => {
  try {
    let user = await sql.findByUsername( username);

    if (!user) {
      result({ kind: "not_found" }, null);
    } else {
      let interest = await sql.getInterests(user.userid);
      let interestToString = [];

      for (let i = 0; i < interest.length; i++) {
        interestToString = interestToString.concat(interest[i].interest);
      }
      const userLog = {
        userid: user.userid,
        username: user.username,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        gender: user.gender,
        genderPreference: user.genderPreference,
        age: user.age,
        profileImage: user.profileImage,
        image_1:user.image_1,
        image_2:user.image_2,
        image_3:user.image_3,
        image_4:user.image_4,
        active: user.active,
        lastseen: user.lastseen,
        dob: user.dob,
        date: user.date,
        bio: user.bio,
        status: user.status,
        interest: interestToString,
        notify: user.notify,
        longitude: user.longitude,
        latitude: user.latitude
      };


      const token = jwt.sign(userLog, process.env.SECRETS);
      const refreshToken = jwt.sign(userLog, process.env.REFRESHTOKENSECRETS, {
        expiresIn: process.env.REFRESHTOKENLIFE,
      });

      const response = {
        Token: token,
        RefreshToken: refreshToken,
      };

      let resultsCallback = sql.updateAuth(
        user.username,
        response.Token,
        response.RefreshToken
      );
      if (resultsCallback) {
        result(null, response);
      }
    }
  } catch (err) {
    console.log("Error in logins: ", err);
    return result(err, null);
  }
};

User.logoutUser = async (username, result) => {
  const date = new Date(Date.now()).toLocaleString();
  let lastSeen = sql.addLastSeen(username, date);
  console.log(lastSeen);
  if (!lastSeen) {
    return result({ kind: "not_found" }, null);
  } else {
    let logout = sql.removeSession(username);
    return result(null, logout);
  }
};

//find a user using their id
User.findById = async (userid, result) => {
  let user = await sql.findById(userid);
  if (!user) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, user);
  }
};

//verifies user after registration
User.verifysReg = async (username, result) => {
  try{
    let statusUpdate = await sql.updateStatus(username,'1');

      result(null, { username: username, statusUpdate });
  }catch (e) {
    result(e, null);
  }
};

//get all the users in the database
User.getUsers = async (userid,gender,agemin,agemax,result) => {
  let user = await sql.getUsers(userid,gender,agemin,agemax);
  if (!user) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, user);
  }
};

//get all the users in the database
User.AllInterest = async (userid,result) => {
  let user = await sql.getAllInterests(userid);
  if (!user) {
    result({ kind: "not_found" }, null);
  } else {
    result(null, user);
  }
};

//used to update the password at forgot password
User.reset = async (username, password, result) => {
  try {
      await sql.updateUserByUsername(username,{password:password});
      let user = await sql.findByUsername(username);
    return result(null, user);
  }
  catch (e) {
    console.log(e);
    return result({ kind: "not_found" }, null);
  }
};

//verification for invalid token and getting new token
User.verifysAgain = async (email, result) => {
  try {
    let user = await sql.findByEmail(email);
    return result(null, user);
  }
  catch (e) {
    console.log(e);
    return result({ kind: "not_found" }, null);
  }
};

//update the user by id
User.updateByID = (userid, user, result) => {
  try {
    let updateUser = sql.updateUserById(userid,user);
    result(null, { userid: userid, ...updateUser });
  }catch (e) {
    result(e, null);
  }
};

User.deleteInterest = async (userid,interestsToDelete,result) =>{
  try {
    let updateInterest = sql.removeInterests(userid, interestsToDelete);
    result(null, updateInterest);
  }catch (e) {
    result(e, null);
  }
}

//update the user by id
User.updateInterest = async (userid, interests, result) => {
  try {
    let updateInterest = sql.addInterests(userid,interests);
    result(null, updateInterest);
  }catch (e) {
    result(e, null);
  }
};

User.installation = async (result) => {
  try{
    let createDB = await dbSetup.createDB();
    let createTables = await dbSetup.createTables();
    let populate = await  dbSetup.populateDB();
    let results = createDB + createTables + populate;
    if (results){
      result(null, "Success");
    }
  }catch (e) {
    result(e,null);
  }
};

User.unInstalling = async (result) => {
  try{
    let results = await dbSetup.dropDB();
    if (results){
      result(null, "Success");
    }
  }catch (e) {
    result(e,null);
  }
};

// User.getMatchedUsers = async (res)

module.exports = User;
