import News from '@models/News';
import { connectToDB } from '@utils/database';

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch the top 7 news articles sorted by number of bookmarks (most popular first)
    const popularNews = await News.find().sort({ bookmarksCount: -1 }).limit(7);

    return new Response(JSON.stringify(popularNews), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching popular news:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch popular news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
