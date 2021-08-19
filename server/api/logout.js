const router = require("express").Router();
const controller = require("../controllers");

router.get("/", controller.Logout.logout);

module.exports = router;
