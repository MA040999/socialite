const router = require("express").Router();
const controller = require("../controllers");
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, controller.Auth.verifyAuth);

module.exports = router;
