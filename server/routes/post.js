const router = require("express").Router();
const postController = require("../controllers/post-controller");

const { auth } = require("../middleware/authMiddleware");

router.get("/get-posts", postController.getPosts);
router.get("/get-post/:id", postController.getPostById);
router.post("/create-post", auth, postController.createPost);
router.put("/update-post/:id", auth, postController.updatePost);
router.put("/like-post/:id", auth, postController.likePost);
router.delete("/delete-post/:id", auth, postController.deletePost);

module.exports = router;
