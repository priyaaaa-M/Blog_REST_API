const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const auth = require("../middleware/auth");

//Import Controller
const { dummyLink, likePost, unlikePost } = require("../controllers/likeController");
const { createComment, deleteComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");

//Mapping Create
router.get("/dummyroute", dummyLink);
router.post("/comments/create", auth, createComment);
router.delete("/comments/:commentId", auth, deleteComment);
router.post("/posts/create", upload.single("image"), auth, createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", auth, likePost);
router.post("/likes/unlike", auth, unlikePost);

//export
module.exports = router;
