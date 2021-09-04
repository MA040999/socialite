const router = require("express").Router();
const postController = require("../controllers/post-controller");

router.post("/createPost", postController.createPost);
router.get("/getPosts", postController.getPosts);

module.exports = router;
