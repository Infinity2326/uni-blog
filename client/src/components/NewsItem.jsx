import React from "react"

import { Link } from "react-router-dom"
export const NewsItem = (n) => {
  if (n.n.title) {
    return (
      <Link to={`/news/${n.n.imgUrl.slice(34, 66)}`}>
        <div className="flex flex-col basis-1/4 flex-grow">
          <div className="flex rounded-sm h-80">
            <img
              src={n?.n?.imgUrl}
              alt="news"
              className="object-cover w-full"
            />
          </div>
          <div className="text-white text-xl">{n?.n?.title}</div>
          <p className="text-white text-xs opacity-60 pt-4 line-clamp-4">
            {n?.n?.text}
          </p>
        </div>
      </Link>
    )
  }
}
