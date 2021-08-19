const router = require("express").Router();
const controller = require("../controllers");

router.post("/", controller.Login.authenticateUser);

module.exports = router;
