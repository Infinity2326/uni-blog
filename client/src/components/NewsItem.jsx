import React from "react"

export const NewsItem = (n) => {
  if (n.n.title) {
    return (
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={n?.n?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
        >
          {n?.n?.imgUrl && (
            <img
              src={n?.n?.imgUrl}
              alt="post"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="text-white text-xl">{n?.n?.title}</div>
        <p className="text-white text-xs opacity-60 pt-4 line-clamp-4">
          {n?.n?.text}
        </p>
      </div>
    )
  }
}
