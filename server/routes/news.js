// Routes/эндпоинты, адреса на которые будут отправляться запросы, чтобы бэкэнд понимал, как его обработать
import { Router } from "express"
import {
  getById,
  getNews,
  getNewsComments,
  likeNews,
} from "../controllers/news.js"

const router = new Router()

// Get news
// http://localhost:3002/api/news
router.get("/", getNews)

router.get("/:id", getById)

// Get news comments
// http://localhost:3002/api/news/comments/:id
router.get("/comments/:id", getNewsComments)
export default router

// Like news
// http://localhost:3002/api/news/like/:id
router.put("/like/:id", likeNews)
