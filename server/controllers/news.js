import News from "../models/News.js"
import { launch } from "puppeteer"
import Post from "../models/Post.js"
import User from "../models/User.js"
import Comment from "../models/Comment.js"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import axios from "axios"

export const saveNews = async (title, text, imgUrl) => {
  try {
    const singleNews = new News({
      title,
      text,
      imgUrl,
    })

    await singleNews.save()
    res.json({ message: "Что-то пошло не так." })
    return res.json({ singleNews })
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

export const getNews = async (req, res) => {
  try {
    const url = "https://www.muiv.ru/about/novosti/"
    async function start() {
      const browser = await launch({
        headless: false,
        defaultViewport: null,
      })

      const page = await browser.newPage()
      await page.goto(url, { waitUntil: "domcontentloaded" })

      const result = await page.evaluate(() => {
        const news = { news: [] }
        document.querySelectorAll(".row").forEach(async (n) => {
          const imgElement = n.querySelector(".col-lg-5 div div")
          const title = n.querySelector(".col-lg-7 h3")?.innerHTML
          const text = n.querySelector(".col-lg-7 p")?.innerHTML
          const imgUrl = `https://muiv.ru${imgElement
            ?.getAttribute("style")
            .slice(23, 88)}`
          news.news.push({
            title,
            text,
            imgUrl,
          })
          saveNews(title, text, imgUrl)
        })

        news.news.map(async (n) => {
          const addNews = new News({
            title: n.title,
            text: n.text,
            imgUrl: n.imgUrl,
          })
          await addNews.save()
        })

        return news
      })
      res.json(result)
      await browser.close()
    }

    start()
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

export const getById = async (req, res) => {
  try {
    // req.params.id айдишник самого поста
    const singleNews = await News.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.json(singleNews)
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}
