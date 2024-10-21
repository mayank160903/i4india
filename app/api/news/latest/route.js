import News from '@models/News';
import { connectToDB } from '@utils/database';

export const GET = async (req) => {
  try {
    await connectToDB();

    const latestNews = await News.find().sort({ createdAt: -1 }).limit(7);

    return new Response(JSON.stringify(latestNews), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch latest news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
