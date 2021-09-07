const router = require("express").Router();
const postController = require("../controllers/post-controller");

router.post("/createPost", postController.createPost);
router.get("/getPosts", postController.getPosts);
router.patch("/updatePost/:id", postController.updatePost);

module.exports = router;
