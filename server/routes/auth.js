const router = require("express").Router();
const authController = require("../controllers/auth-controller");

// const { auth } = require("../middleware/authMiddleware");

router.post("/signup", authController.createUser);
router.post("/login", authController.authenticateUser);
router.get("/logout", authController.logout);
// router.get("/verify-auth", auth, authController.verifyAuth);

module.exports = router;
