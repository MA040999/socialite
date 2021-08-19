const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "jwt_token_secret", (err, decodedToken) => {
      if (err) {
        res.status(403);
      } else {
        req.fullname = decodedToken.fullname;
        req.userId = decodedToken.id;
      }
    });
  } else {
    res.status(401);
  }
  next();
};

module.exports = { auth };
