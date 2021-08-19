const router = require("express").Router();
const controller = require("../controllers");

router.post("/", controller.Signup.createUser);

module.exports = router;
