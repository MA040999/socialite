const router = require("express").Router();
const postController = require("../controllers/post-controller");

router.post("/createPost", postController.createPost);
router.get("/getPosts", postController.getPosts);
router.put("/updatePost/:id", postController.updatePost);
router.put("/likePost/:id", postController.likePost);
router.put("/dislikePost/:id", postController.dislikePost);
router.delete("/deletePost/:id", postController.deletePost);

module.exports = router;
