const logout = (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
};

module.exports = { logout };
