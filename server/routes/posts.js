// Routes/эндпоинты, адреса на которые будут отправляться запросы, чтобы бэкэнд понимал, как его обработать
import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
  getPostComments,
  approvePost,
} from "../controllers/posts.js"

const router = new Router()

// Create Post
// http://localhost:3002/api/posts
// запрос с фронтенда на бэкэнд - post
router.post("/", checkAuth, createPost)

// Get all
// http://localhost:3002/api/posts
router.get("/", getAll)

// Get post by id
// http://localhost:3002/api/posts/:id
router.get("/:id", getById)

// Get my posts
// http://localhost:3002/api/posts/user/me
router.get("/user/me", checkAuth, getMyPosts)

// Remove post by id
// http://localhost:3002/api/posts/:id
router.delete("/:id", checkAuth, removePost)

// Remove post by id
// http://localhost:3002/api/posts/suggested/:id
router.delete("/suggested/:id", checkAuth, removePost)

// Approve post by id
// http://localhost:3002/api/posts/suggested/:id
router.put("/suggested/:id", checkAuth, approvePost)

// Update edit by id
// http://localhost:3002/api/posts/:id
router.put("/:id", checkAuth, updatePost)

// Get post comments
// http://localhost:3002/api/posts/comments/:id
router.get("/comments/:id", getPostComments)

export default router
