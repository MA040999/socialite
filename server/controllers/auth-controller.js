const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authenticateUser = async function (req, res) {
  try {
    const user = await db.Users.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: "User does not exist." });

    const auth = await bcrypt.compare(req.body.password, user.password);

    if (!auth) return res.status(400).json({ message: "Invalid password." });

    const token = jwt.sign(
      {
        id: user._id,
        fullname: user.fullname,
        displayImage: user.displayImage,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 6,
      }
    );

    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   "refresh_secret_token",
    //   {
    //     expiresIn: 60 * 60 * 24,
    //   }
    // );
    // await res.setHeader("authorization", `Bearer ${token}`);
    // res.cookie("refresh_token", token, { httpOnly: true });
    // await db.RefreshToken.create({ token });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 5,
      // secure: process.env.NODE_ENV === "production" ? true : false,
    });

    res
      .status(200)
      .json({
        id: user._id,
        fullname: user.fullname,
        displayImage: user.displayImage,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.Users.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ message: "User with this email already exists." });

    db.Users.create(req.body).then((result) => {
      const token = jwt.sign(
        {
          id: result._id,
          fullname: result.fullname,
          displayImage: result.displayImage,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 6,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 5,
      });
      res.status(200).json({
        id: result._id,
        fullname: result.fullname,
        displayImage: result.displayImage,
      });
    });
  } catch {
    res.status(500).json({ message: "Error occured, user not created" });
  }
};

// const verifyAuth = (req, res) => {
//   res.json({ id: req.userId, fullname: req.fullname });
// };

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
};

module.exports = { authenticateUser, logout, createUser };
