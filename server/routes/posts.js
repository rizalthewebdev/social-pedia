import express from "express";
import { getFeedPosts, getuserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getuserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;
