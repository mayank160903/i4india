import { connectToDB } from "@utils/database";
import News from "@models/News";
import User from "@models/user";

export const PATCH = async (req) => {
  const { userId, newsId } = await req.json();

  try {
    await connectToDB();

    // Add the news to the user's bookmarks
    const user = await User.findById(userId);
    if (!user.bookmarkedNews.includes(newsId)) {
      user.bookmarkedNews.push(newsId);
      await user.save();
    }

    // Add the user to the news' bookmarks
    const news = await News.findById(newsId);
    if (!news.bookmarks.includes(userId)) {
      news.bookmarks.push(userId);
      await news.save();
    }

    return new Response(JSON.stringify({ message: "News bookmarked successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to bookmark news." }), {
      status: 500,
    });
  }
};
