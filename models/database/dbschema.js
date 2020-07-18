const databaseSchema = `
CREATE TABLE IF NOT EXISTS \`users\` (
  \`userid\` int NOT NULL AUTO_INCREMENT,
  \`username\` varchar(255) NOT NULL,
  \`email\` varchar(255) NOT NULL,
  \`password\` varchar(255) NOT NULL,
  \`firstname\` varchar(255) NOT NULL,
  \`lastname\` varchar(255) NOT NULL,
  \`gender\` varchar(255) DEFAULT 'Other',
  \`genderPreference\` varchar(255) DEFAULT 'Both',
  \`bio\` longtext,
  \`age\` int DEFAULT NULL,
  \`dob\` varchar(255) DEFAULT NULL,
  \`token\` varchar(500) DEFAULT NULL,
  \`status\` varchar(255) NOT NULL DEFAULT '0',
  \`image_1\` varchar(255) DEFAULT NULL,
  \`image_2\` varchar(255) DEFAULT NULL,
  \`image_3\` varchar(255) DEFAULT NULL,
  \`image_4\` varchar(255) DEFAULT NULL,
  \`active\` tinyint(1) DEFAULT '0',
  \`lastseen\` varchar(255) DEFAULT NULL,
  \`profileImage\` varchar(255) DEFAULT NULL,
  \`date\` varchar(255) DEFAULT NULL,
  \`notify\` tinyint(1) DEFAULT '1',
  \`longitude\` varchar(255) DEFAULT NULL,
  \`latitude\` varchar(255) DEFAULT NULL,
  \`popularity\` int DEFAULT '1',
  PRIMARY KEY (\`userid\`),
  UNIQUE KEY \`username\` (\`username\`),
  UNIQUE KEY \`users_email_uindex\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS \`auth\` (
  \`authid\` int unsigned NOT NULL AUTO_INCREMENT,
  \`userid\` int NOT NULL,
  \`username\` varchar(255) DEFAULT NULL,
  \`Token\` longtext,
  \`RefreshToken\` longtext,
  PRIMARY KEY (\`authid\`),
  KEY \`userid\` (\`userid\`),
  CONSTRAINT \`auth_ibfk_1\` FOREIGN KEY (\`userid\`) REFERENCES \`users\` (\`userid\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS \`dislikes\` (
  \`dislikeid\` int unsigned NOT NULL AUTO_INCREMENT,
  \`userid\` int NOT NULL,
  \`dislikedid\` int NOT NULL,
  PRIMARY KEY (\`dislikeid\`),
  KEY \`userid\` (\`userid\`),
  CONSTRAINT \`dislikes_ibfk_1\` FOREIGN KEY (\`userid\`) REFERENCES \`users\` (\`userid\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS \`interests\` (
  \`interestid\` int unsigned NOT NULL AUTO_INCREMENT,
  \`userid\` int NOT NULL,
  \`interest\` varchar(255) NOT NULL,
  PRIMARY KEY (\`interestid\`),
  KEY \`userid\` (\`userid\`),
  CONSTRAINT \`interests_ibfk_1\` FOREIGN KEY (\`userid\`) REFERENCES \`users\` (\`userid\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS \`notifications\` (
  \`notifyid\` int unsigned NOT NULL AUTO_INCREMENT,
  \`receiverUsername\` varchar(255) DEFAULT NULL,
  \`senderUsername\` varchar(255) DEFAULT NULL,
  \`receiverEmail\` varchar(255) DEFAULT NULL,
  \`message\` varchar(500) DEFAULT NULL,
  \`seen\` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (\`notifyid\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS \`likes\` (
  \`likeid\` int unsigned NOT NULL AUTO_INCREMENT,
  \`userid\` int NOT NULL,
  \`senderuserid\` int DEFAULT NULL,
  \`recieveruserid\` int DEFAULT NULL,
  \`notify\` int DEFAULT NULL,
  PRIMARY KEY (\`likeid\`),
  KEY \`userid\` (\`userid\`),
  CONSTRAINT \`likes_ibfk_1\` FOREIGN KEY (\`userid\`) REFERENCES \`users\` (\`userid\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

module.exports = databaseSchema;