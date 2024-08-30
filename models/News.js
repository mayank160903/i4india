import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['General', 'Business', 'Entertainment', 'Sports', 'Science', 'Technology', 'Education', 'History'], required: true },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps : true});

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

export default News;
