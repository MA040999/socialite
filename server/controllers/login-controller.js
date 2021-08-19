const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authenticateUser = async function (req, res) {
  try {
    const user = await db.Users.findOne({ username: req.body.username });

    if (user) {
      const auth = await bcrypt.compare(req.body.password, user.password);

      if (auth) {
        const token = jwt.sign(
          { id: user._id, fullname: user.fullname },
          "jwt_token_secret",
          {
            expiresIn: 60 * 60 * 24,
          }
        );

        // const token = jwt.sign(
        //   { id: user._id, username: user.username },
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
        res.status(200).json({ id: user._id, fullname: user.fullname });
        return;
      }
    }
    res.status(404).json({ message: "Username or Password is incorrect" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
