// Routes/эндпоинты, адреса на которые будут отправляться запросы, чтобы бэкэнд понимал, как его обработать
import { Router } from "express"
import { getById, getNews } from "../controllers/news.js"

const router = new Router()

// Get news
// http://localhost:3002/api/news
router.get("/", getNews)

router.get("/:id", getById)
export default router
