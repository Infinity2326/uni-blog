import Post from "../models/Post.js"
import User from "../models/User.js"
import Comment from "../models/Comment.js"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

// Constants
const TOKEN = process.env.TOKEN
const CHAT_ID = process.env.CHAT_ID

// Create post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body
    const user = await User.findById(req.userId)
    // Работа с изображением поста
    if (req.files) {
      // присваиваем уникальное имя для изображения
      let fileName = Date.now().toString() + req.files.image.name
      // получаем путь к текущей папке (контроллеры)
      const __dirname = dirname(fileURLToPath(import.meta.url))
      // перемещаем изображение из папки controller в uploads
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName))

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      })

      await newPostWithImage.save()
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      })

      return res.json({ newPostWithImage })
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    })

    await newPostWithoutImage.save()
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    })

    return res.json({ newPostWithoutImage })
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

// Get all posts
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAd")
    const popularPosts = await Post.find().limit(5).sort("-views")
    if (!posts) {
      return res.json({ message: "Постов нет" })
    }

    res.json({ posts, popularPosts })
  } catch (error) {
    res.json({ message: "Что-то пошло не так" })
  }
}

export const getById = async (req, res) => {
  try {
    // req.params.id айдишник самого поста
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.json(post)
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id)
      })
    )

    res.json(list)
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

export const removePost = async (req, res) => {
  try {
    // req.params.id айдишник самого поста
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.json({ message: "Такого поста не существует" })

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    })
    res.json({ message: "Пост был удален" })
  } catch (error) {
    res.json({ message: "Что-то пошло не так." })
  }
}

export const updatePost = async (req, res) => {
  try {
    // req.params.id айдишник самого поста
    const { title, text, id } = req.body
    // получаем пост для редактирвоания по его айди
    const post = await Post.findById(id)

    if (req.files) {
      // присваиваем уникальное имя для изображения
      let fileName = Date.now().toString() + req.files.image.name
      // получаем путь к текущей папке (контроллеры)
      const __dirname = dirname(fileURLToPath(import.meta.url))
      // перемещаем изображение из папки controller в uploads
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName))
      post.imgUrl = fileName || ""
    }
    // перезаписываем поля текста и заголовка и сохраняем
    post.title = title
    post.text = text

    await post.save()

    res.json(post)
  } catch (error) {
    res.json({ message: "Что-то пошло не так. update" })
  }
}

export const approvePost = async (req, res) => {
  try {
    const p = await Post.findById(req.params.id)
    const post = await Post.findById(p._id)
    post.approved = true
    await post.save()

    if (post.imgUrl) {
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName))
      axios.get(
        `https://api.telegram.org/bot${TOKEN}/sendPhoto?chat_id=${CHAT_ID}&photo=https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg&caption=${post.title}%0A${post.text}%0AАвтор: ${post.username}`
      )
    } else {
      axios.get(
        `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${post.title}%0A${post.text}%0AАвтор: ${post.username}`
      )
    }
    res.json(post)
  } catch (error) {
    res.json({ message: "Что-то пошло не так. approve" })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment)
      })
    )
    res.json(list)
  } catch (error) {
    console.log(error)
  }
}
