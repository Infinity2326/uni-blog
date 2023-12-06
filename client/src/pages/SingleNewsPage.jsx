import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNews } from "../redux/features/news/newsSlice"
import { Link } from "react-router-dom"
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai"

export const SingleNewsPage = () => {
  const dispatch = useDispatch()
  const [singleNews, setSingleNews] = useState("")
  const { news } = useSelector((state) => state.news)
  const currentUrl = window.location.href.slice(27)

  useEffect(() => {
    if (news) {
      setSingleNews(news?.filter((n) => n.imgUrl.includes(`${currentUrl}`)))
    }
  }, [currentUrl, news])

  if (news) {
    return (
      <div>
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
          <Link className="flex" to={"/news"}>
            Назад
          </Link>
        </button>
        <div className="flex gap-10 py-8">
          <div className="w-2/3">
            <div className="flex flex-col basis-1/4 flex-grow">
              <div className="flex rounded-sm h-80">
                <img
                  src={singleNews[0]?.imgUrl}
                  alt="post"
                  className="object-cover w-full"
                />
              </div>
            </div>
            <div className="text-white text-xl">{singleNews[0]?.title}</div>
            <p className="text-white text-xs opacity-60 pt-4">
              {singleNews[0]?.text}
            </p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>0</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage /> <span>0</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="text-xl text-center text-white py-10">
      Новостей не существует
    </div>
  )
}
