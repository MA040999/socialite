exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
};
