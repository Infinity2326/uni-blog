import axios from "axios"

// создание отдельного инстанса axios для приложения

const instance = axios.create({
  baseURL: "http://localhost:3002/api",
  validateStatus: () => true,
})

// добавление в запрос хедера токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token")
  return config
})

export default instance
