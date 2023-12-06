import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
  news: [],
  loading: false,
}

export const getNews = createAsyncThunk("news/getNews", async () => {
  try {
    const { data } = await axios.get("/news")
    return data
  } catch (error) {
    console.log(error)
  }
})

export const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // Получение всех новостей
    [getNews.pending]: (state) => {
      state.loading = true
    },
    [getNews.fulfilled]: (state, action) => {
      state.loading = false
      state.news = action.payload.news
    },
    [getNews.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default newsSlice.reducer
