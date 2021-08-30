const db = require("../models");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  try {
    db.Users.create(req.body).then((result) => {
      const token = jwt.sign(
        { id: result._id, fullname: result.fullname },
        "jwt_token_secret",
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 5,
      });
      res.status(200).json({ id: result._id, fullname: result.fullname });
    });
  } catch {
    res.status(500).json("Error occured, user not created");
  }
};

module.exports = { createUser };
