const router = require("express").Router();
const Users = require("../models/users");
const commonFunction = require("./commonFunctions");

//get matches by location only
router.get("/matchesbyLocation", async function (req, res) {
  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by interests only
router.get("/matchesbyInterests", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by location and age only
router.get("/matchesbyLocation_age", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by interests and age only
router.get("/matchesbyInterests_age", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by interests and location only
router.get("/matchesbyLocation_interests", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by interests, location and age only
router.get("/matchesbyAllFilters", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get all the users by gender
router.get("/matchesbyGender", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get matches by liked
router.get("/matchesbyLike", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});

//get all suggestions
router.get("/matchesbyAll", async function (req, res) {
  let interest = commonFunction.interestsIf(req, res);
  let match = [];

  console.log("interesss>>>>>>>", interest);
  if (interest.length != 0) {
    await Users.find(
      {
        $and: [
          { username: { $ne: req.session.user.username } },
          { $or: interest },
        ],
      },
      (err, matches) => {
        if (err) {
          console.log("When trying to find matches", err);
        }

        if (matches.length != 0) {
          match = matches;
        }
      }
    );
  }

  console.log(match);
  res.render("home", { match: match });
});
