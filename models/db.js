const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const { reject } = require("lodash");

const poolConnection = mysql.createPool({
  connectionLimit: 1000,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 3306,
});

let matchaDb = {};


/*
* ALl User Select Queries
* */

matchaDb.findById = (table, id) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from ${table} WHERE userid = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from users WHERE username = ?`,
            [username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from users WHERE email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.insert = (table,data)=>{
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `Insert INTO ${table} SET ?`,
            data,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
}

matchaDb.saveAuth = (userId, username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "INSERT INTO auth (userid, username, Token, RefreshToken) VALUES (?,?,?,?)",
      [userId, username, token, refreshToken],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.updateAuth = (username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [token, refreshToken, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.updateUserById = (userid, user) => {
    console.log(user);
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `UPDATE users SET ? WHERE userid = ?`,
            [user,
                userid,
            ],
            (err, results) => {
                console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.updateUserByUsername = (username, user) => {
    console.log(user);
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `UPDATE users SET ? WHERE username = ?`,
            [user,
                username,
            ],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.updateStatus = (username, status) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "UPDATE users SET status = ? WHERE username = ?",
            [status, username],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.addLastSeen = (username, lastSeen) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [lastSeen, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.removeSession = (username) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "DELETE FROM auth WHERE username = ?",
      [username],
      (err, results) => {
        console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};


/*
* Interests  Start Here
*/


matchaDb.getInterests = (userid) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT interest from interests  WHERE userid = ?`,
            [userid],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.getUserByInterests = (userid, interestsArray) => {
    let newArray = interestsArray.join(",");
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from interests WHERE interest IN ${newArray} AND userid != ${userid}`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.getNotifications = (receiverUsername, senderUsername) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from notifications  WHERE (receiverUsername = ? AND senderUsername = ?) || (receiverUsername = ? AND senderUsername = ?)`,
            [receiverUsername, senderUsername, senderUsername, receiverUsername],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.removeInterests = (userid,interestsToDelete = []) => {
    return new Promise((resolve, reject) => {
        console.log('interestsToDelete => ', interestsToDelete)
        for (let interestToDelete of interestsToDelete) {
            poolConnection.query(
                `DELETE FROM interests WHERE userid = ? AND interest = ?`,
                [userid, interestToDelete.toLocaleString()],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(results[0]);
                }
            );
        }
    });
}


matchaDb.addInterests =  async (userid, interestsToAdd = []) => {
    return new Promise((resolve, reject) => {
            for (let interestToAdd of interestsToAdd) {
                poolConnection.query(
                    `Insert INTO interests SET userid = ?, interest = ?`,
                    [userid,interestToAdd.toLocaleString()],
                    (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    }
                );
            }
    });
}

matchaDb.getAllInterests = (userid) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "SELECT * FROM interests WHERE userid != ?",
            [userid],
            (err, results) => {
                // console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

/*
* Interests  Start Ends Here
*/


matchaDb.getOnlineUsers = () => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "SELECT userid FROM users WHERE lastseen=?",
            'online',
            (err, results) => {
                console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.getRandomUsers = (gender) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            "SELECT * FROM users WHERE gender=? AND ( age BETWEEN 20 AND 50) LIMIT 15",
            [gender],
            (err, results) => {
                // console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

matchaDb.getUsers = (userid,gender,agemin,agemax) => {
    const query = `SELECT * FROM users 
                    WHERE userid != ? 
                    AND gender=?  
                    AND ( age BETWEEN ? AND ?) 
                    ORDER BY popularity 
                    LIMIT 1000`;
    return new Promise((resolve, reject) => {
        poolConnection.query(
            query,
            [userid,gender,agemin,agemax],
            (err, results) => {
                // console.log(results);
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
}

module.exports = matchaDb;

