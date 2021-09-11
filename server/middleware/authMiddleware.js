const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.userId = decodedTokenData?.id;
      req.fullname = decodedTokenData?.fullname;
      req.displayImage = decodedTokenData?.displayImage;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth };
