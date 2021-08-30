const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, authController.verifyAuth);

module.exports = router;
