import { connectToDB } from '@/utils/database';
import News from '@/models/News';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Extract category from the dynamic path parameter
    const { category } = params;

    // Perform a case-insensitive search for the category
    const news = await News.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
    });

    if (!news.length) {
      return new Response("News Not Found", { status: 404 });
    }
    console.log(news);
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    console.error("Error fetching news by category:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
