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
        expiresIn: 60 * 10,
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id,
        fullname: user.fullname,
        displayImage: user.displayImage
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 48,
      }
    );
    res.cookie("__refresh__token", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48, });
    
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : true,
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 4,
    //   // secure: process.env.NODE_ENV === "production" ? true : false,
    // });

    res.status(200).json({
      userData: {
        id: user._id,
        fullname: user.fullname,
        displayImage: user.displayImage,
      },
      token
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
      const refreshToken = jwt.sign(
        { id: result._id,
          fullname: result.fullname,
          displayImage: result.displayImage
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 48,
        }
      );
      
      const token = jwt.sign(
        {
          id: result._id,
          fullname: result.fullname,
          displayImage: result.displayImage,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 10,
        }
      );
      res.cookie("__refresh__token", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48, });
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   sameSite: process.env.NODE_ENV === "production" ? "none" : true,
      //   secure: true,
      //   maxAge: 1000 * 60 * 60 * 4,
      // });
      res.status(200).json(
        {
          userData: {
            id: result._id,
            fullname: result.fullname,
            displayImage: result.displayImage,
          },
          token
      });
    });
  } catch {
    res.status(500).json({ message: "Error occured, user not created" });
  }
};

const verifyAuth = (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  return res.status(200).json({
    id: req.userId,
    fullname: req.fullname,
    displayImage: req.displayImage,
  });
};

const logout = (req, res) => {
  res.clearCookie("__refresh__token");
  res.sendStatus(200);
};

const verifyRefreshToken = (req,res) => {
  const refreshToken = req.cookies.__refresh__token;

  if (refreshToken) {
    const decodedTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    if(decodedTokenData){
      const token = jwt.sign(
        {
          id: decodedTokenData?.id,
          fullname: decodedTokenData?.fullname,
          displayImage: decodedTokenData?.displayImage,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 60 * 10,
        }
      );

      return res.status(200).json({
        userData: {
          id: decodedTokenData.id,
          fullname: decodedTokenData.fullname,
          displayImage: decodedTokenData.displayImage,
        },
        token,
      });
    }
  }
  return res.status(401).json({ message: "Unauthorized" });
}

module.exports = { authenticateUser, logout, createUser, verifyAuth, verifyRefreshToken };
