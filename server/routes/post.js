const router = require("express").Router();
const postController = require("../controllers/post-controller");

router.post("/createPost", postController.createPost);
router.get("/getPosts", postController.getPosts);
router.patch("/updatePost/:id", postController.updatePost);
router.patch("/likePost/:id", postController.likePost);
router.patch("/dislikePost/:id", postController.dislikePost);
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
