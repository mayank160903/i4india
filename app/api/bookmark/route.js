import { connectToDB } from "@utils/database";
import News from "@models/News";
import User from "@models/user";

export const PATCH = async (req) => {
  const { userId, newsId } = await req.json();

  try {
    await connectToDB();

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found." }), { status: 404 });
    }

    // Find the news
    const news = await News.findById(newsId);
    if (!news) {
      return new Response(JSON.stringify({ message: "News not found." }), { status: 404 });
    }

    // Add the news to the user's bookmarks if not already bookmarked
    if (!user.bookmarkedNews.includes(newsId)) {
      user.bookmarkedNews.push(newsId);
      await user.save();
    }

    // Add the user to the news' bookmarks if not already bookmarked
    if (!news.bookmarks.includes(userId)) {
      news.bookmarks.push(userId);
      await news.save();
    }

    return new Response(JSON.stringify({ message: "News bookmarked successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error bookmarking news:", error);
    return new Response(JSON.stringify({ message: "Failed to bookmark news." }), {
      status: 500,
    });
  }
};
