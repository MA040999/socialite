const verifyAuth = (req, res) => {
  res.json({ id: req.userId, fullname: req.fullname });
};

module.exports = { verifyAuth };
