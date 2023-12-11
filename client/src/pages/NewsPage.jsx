import React, { useEffect } from "react"
import { NewsItem } from "../components/NewsItem"
import { useDispatch, useSelector } from "react-redux"
import { getNews } from "../redux/features/news/newsSlice"

export const NewsPage = () => {
  const dispatch = useDispatch()
  const { news } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])
  if (!news) {
    return (
      <div className="text-xl text-center text-white py-10">
        Новостей не существует
      </div>
    )
  }

  if (news) {
    return (
      <div className="max-w-[900px] mx-auto py-10">
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-10 basis-4/5">
            {news.map((n, idx) => (
              <NewsItem key={idx} n={n} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
