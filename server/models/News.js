// описание моделей/схем базы данных
import mongoose from "mongoose"

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model("News", NewsSchema)
